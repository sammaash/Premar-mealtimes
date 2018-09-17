import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalsProvider } from '../../providers/globals/globals';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FinishPage } from '../finish/finish';

interface misslunch {
    lunchvalue: string
}
interface reasone {
    lunchvalue: null
}
interface reasone2 {
    lunchvalue: null
}
@IonicPage()
@Component({
    selector: 'page-lifestyle',
    templateUrl: 'lifestyle.html',
})
export class LifestylePage {

    alreadySaved: boolean = false;

    takeaway: string = "";
    variety: string = "";
    likelunch: string = "";
    lunchkesho: string = "";
    work: string = "";
    skipslunches: string = "";
    reason: string = "";
    challenges: string = "";
    lunchi: string = "";
    lunchvalue: string = "";
    onlinefrom: string = "";
    office: string = "";
    home: string = "";
    challenge: string = "";
    missed: string = "";

    misslunchs: misslunch[] = [];
    misslunchsJSON: misslunch[] = [];
    reasones: reasone[] = [];
    reasonesJSON: reasone[] = [];
    reasone2s: reasone2[] = [];
    reasone2sJSON: reasone2[] = [];

    selectOptions: any;
    selectOptions_indemnity: any;

    lifestyleList: AngularFireList<any>;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public globals: GlobalsProvider,
        public afDatabase: AngularFireDatabase) {

        this.lifestyleList = afDatabase.list('/lifestyle');
    }

    hasNulls(): boolean {
        if (
            this.globals.isNullVal(this.variety) ||
            this.globals.isNullVal(this.takeaway) ||
            this.globals.isNullVal(this.likelunch) ||
            this.globals.isNullVal(this.lunchkesho) ||
            this.globals.isNullVal(this.skipslunches) ||
            this.globals.isNullVal(this.challenges) ||
            (this.challenges == '1' && (
                this.globals.isNullVal(this.onlinefrom) ||
                this.globals.isNullVal(this.office) ||
                this.globals.isNullVal(this.home) ||
                this.globals.isNullVal(this.challenge)
            )) ||
            (this.skipslunches == '1' && (
                this.globals.isNullVal(this.reason) ||
                (this.reason == '1' && this.globals.isNullVal(this.lunchvalue)) ||
                this.globals.isNullVal(this.work) ||
                this.globals.isNullVal(this.lunchi)
            ))
        ) {
            return true;
        }
        this.globals.isLifestyleReady = true;
        return false;
    }

    ionViewDidLeave() {
        if (this.hasNulls()) {
            this.globals.showToast("Please answer all questions in the \'Lifestyle\' tab");
            return; // this tab is not completely filled
        } else if (this.alreadySaved)
            return;
        this.nextTab(this.variety, this.takeaway, this.likelunch, this.lunchkesho, this.skipslunches, this.reason,
            this.lunchvalue, this.work, this.lunchi, this.challenges, this.onlinefrom, this.office,
            this.home, this.challenge, this.missed);
        ;
    }

    nextTab(variety, takeaway, likelunch, lunchkesho, skipslunches, reason, lunchvalue, work, lunchi, challenges, onlinefrom, office, home, challenge, missed) {

        if (this.hasNulls()) {
            this.globals.showToast("Please answer all required questions.");
            return; // this tab is not completely filled
        }

        let newlifestyleRef;
        if (this.globals.firebaseRef != null) {// if we already have Firebase key for this session, use it
            newlifestyleRef = this.lifestyleList.push({ name: this.globals.firebaseRef });
        } else {
            newlifestyleRef = this.lifestyleList.push({}); // else generate new key and save it as a global variable
            this.globals.firebaseRef = newlifestyleRef.key;
        }

        newlifestyleRef.set({
            Preferredmeatvariety: this.variety,
            timemostlikelytoneedtakeoutfood: this.takeaway,
            lunchmostlikelytobuy: this.likelunch,
            lunchchoicetommorow: this.lunchkesho,
            Doyoumisslunch: this.skipslunches,
            Reasontomisslunch: this.reason,
            otherreason: this.lunchvalue,
            Doyouconcentrateaftermissinglunch: this.work,
            Whydontyoucarrylunchfromhome: this.lunchi,
            Doyouorderfoodonline: this.challenges,
            Wheredoyouorderfoodfrom: this.onlinefrom,
            whyorderfoodattheoffice: this.office,
            whyorderfoodathome: this.home,
            challengeswhileorderingfood: this.challenge,
            Whatareyoumissingfromthefoodyougetnow: this.missed
        }).then(newlifestyle => {
            this.globals.showToast("Successfully saved 'Lifestyle' tab details.", 'bottom');
        },
            error => {
                this.globals.showToast("Failed to save, please check your internet connection.", 'bottom');
            }
        );
        this.navCtrl.parent.select(2);


        this.navCtrl.push(FinishPage);

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LifestylePage');
    }

}
