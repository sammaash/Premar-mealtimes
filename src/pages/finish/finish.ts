import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GlobalsProvider } from '../../providers/globals/globals';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


interface Contact {
    phone: string, email: string
}


@IonicPage()
@Component({
    templateUrl: 'finish.html',
})
export class FinishPage {

    phone: string = "";
    email: string = "";
    comments: string = "";
    allowPhone: boolean = true;
    allowEmail: boolean = true;


    finalList: AngularFireList<any>;
    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
        public globals: GlobalsProvider, public afDatabase: AngularFireDatabase) {

        this.finalList = afDatabase.list('/final');
    }

    hasNulls(): boolean {
        if (
            this.globals.isNullVal(this.phone) ||
            this.globals.isNullVal(this.email)
            // || this.globals.isNullVal(this.comments)
        ) {
            return true;
        }
        this.globals.isFinishReady = true;
        return false;
    }

    nextTab(phone, email) {
        if (this.hasNulls()) {
            this.globals.showToast("Please answer all required questions.");
            return; // this tab is not completely filled
        } else if (!this.globals.isValidPhone(this.phone)) {
            this.globals.showToast("Invalid phone number.");
            return;
        } else if (!this.globals.isValidEmail(this.email)) {
            this.globals.showToast("Invalid email address.");
            return;
        }

        let data = {
            phone: this.phone,
            email: this.email,
            comments: this.comments,
            allowPhone: this.allowPhone,
            allowEmail: this.allowEmail
        };

        let thenableObj;

        if (this.globals.firebaseRef != null) {// if we already have Firebase key for this session, use it
            thenableObj = this.finalList.set(this.globals.firebaseRef, data); // this.globals.firebaseRef
        } else {
            thenableObj = this.finalList.push(data); // else generate new key and save it as a global variable
            this.globals.firebaseRef = thenableObj.key;
        }

        /**
         * I have put this here instead of at the top so that we are able to first save the customer's contact details
         * even if the other details are still missing
         */
        if(!this.globals.isBudgetReady) {
            this.globals.showToast("Please answer all questions in the \'Budget\' tab");
            return;
        } else if(!this.globals.isLifestyleReady) {
            this.globals.showToast("Please answer all questions in the \'Lifestyle\' tab");
            return;
        }

        thenableObj.then(newfinal => {
            this.globals.showToast("Thank you for your time :)", 'bottom');
            let alert = this.globals.showAlert("You're Done", "Thank you for your time. We shall inform you once the project is complete.");
            alert.onDidDismiss(() => {
                  //this.nav.push("http://premar.tech")
                window.open("http://premar.tech", '_self');
                this.platform.exitApp();
            });
        },
            error => {
                this.globals.showToast("Failed to save, please check your internet connection.", 'bottom');
            }
        );
    }

    ionViewDidLeave() {
        this.nextTab(this.phone, this.email);
    }

}


