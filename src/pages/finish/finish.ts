import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public globals: GlobalsProvider, public afDatabase: AngularFireDatabase) {

        this.finalList = afDatabase.list('/final');
    }

    hasNulls(): boolean {
        if (
            this.globals.isNullVal(this.phone) ||
            this.globals.isNullVal(this.email) ||
            this.globals.isNullVal(this.comments)
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

        let newfinalRef;
        if (this.globals.firebaseRef != null) {// if we already have Firebase key for this session, use it
            newfinalRef = this.finalList.push({ name: this.globals.firebaseRef });
        } else {
            newfinalRef = this.finalList.push({}); // else generate new key and save it as a global variable
            this.globals.firebaseRef = newfinalRef.key;
        }

        newfinalRef.set({
            phone: this.phone,
            email: this.email,
            comments: this.comments,
            allowPhone: this.allowPhone,
            allowEmail: this.allowEmail
        }).then(newfinal => {
            this.globals.showToast("Thank you for your time :)", 'bottom');
            this.globals.showAlert("Finished", "Thank you for your time. We shall inform you once the project is complete.");
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


