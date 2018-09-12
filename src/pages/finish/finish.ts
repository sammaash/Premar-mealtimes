import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


interface Contact {
phone: string,email: string
}


@IonicPage()
@Component({
templateUrl: 'finish.html',
})
export class FinishPage {

phone: string = "";
email: string = "";


monthlyearnings: string = "N/A";
foodbudget: string = "N/A";
lunch: string = "N/A";
paylunch: string = "N/A";
lunchcost: string = "N/A";
    
    
takeaway: string = "N/A";
variety: string = "N/A";
likelunch: string = "N/A";
lunchkesho: string = "N/A";
work: string = "N/A";
lunches: string = "N/A";
reason: string = "N/A";
challenges: string = "N/A";
lunchi: string = "";
lunchvalue: string = "";
onlinefrom: string = "";
office: string = "";
home: string = "";
challenge: string = "";
missed: string = "";
//monthlyearnings: string = "";
    

misslunchs: misslunch[] = [];
misslunchsJSON: misslunch[] = [];
reasones: reasone[] = [];
reasonesJSON: reasone[] = [];
reasone2s: reasone2[] = [];
reasone2sJSON: reasone2[] = [];
    

finalList: AngularFireList<any>;
    constructor(public navCtrl: NavController, public navParams: NavParams,
    public globals: GlobalsProvider,public afDatabase: AngularFireDatabase) {

    this.monthlyearnings = navParams.get('monthlyearnings');
    this.globals.monthlyearnings=this.monthlyearnings;
    this.foodbudget = navParams.get('foodbudget');
    this.globals.foodbudget=this.foodbudget;
    this.lunch = navParams.get('lunch');
    this.globals.lunch=this.lunch;
    this.paylunch = navParams.get('paylunch');
    this.globals.paylunch=this.paylunch;
    this.lunchcost = navParams.get('lunchcost');
    this.globals.lunchcost=this.lunchcost;
    this.variety = navParams.get('variety');
    this.globals.variety=this.variety;
    this.takeaway = navParams.get('takeaway');
    this.globals.takeaway=this.takeaway;
    this.likelunch = navParams.get('likelunch');
    this.globals.likelunch=this.likelunch;
    this.lunchkesho = navParams.get('lunchkesho');
    this.globals.lunchkesho=this.lunchkesho;
    this.lunches = navParams.get('lunches');
    this.globals.lunches=this.lunches;
    this.reason = navParams.get('reason');
    this.globals.reason=this.reason;
    this.lunchvalue = navParams.get('lunchvalue');
    this.globals.lunchvalue=this.lunchvalue;
    this.work = navParams.get('work');
    this.globals.work=this.work;
    this.lunchi = navParams.get('lunchi');
    this.globals.lunchi=this.lunchi;
    this.challenges = navParams.get('challenges');
    this.globals.challenges=this.challenges;
    this.onlinefrom = navParams.get('onlinefrom');
    this.globals.onlinefrom=this.onlinefrom;
    this.office = navParams.get('office');
    this.globals.office=this.office;
    this.home = navParams.get('home');
    this.globals.home=this.home;
    this.challenge = navParams.get('challenge');
    this.globals.challenge=this.challenge;
    this.missed = navParams.get('missed');
    this.globals.missed=this.missed;







    this.finalList = afDatabase.list('/final');

    }

    nextTab(phone,email) {
    this.monthlyearnings = this.globals.monthlyearnings;
    this.foodbudget = this.globals.foodbudget;
    this.lunch = this.globals.lunch;
    this.paylunch = this.globals.paylunch;
    this.lunchcost = this.globals.lunchcost;
    this.variety = this.globals.variety;
    this.takeaway = this.globals.takeaway;
    this.likelunch = this.globals.likelunch;
    this.lunchkesho = this.globals.lunchkesho;
    this.lunches = this.globals.lunches;
    this.reason = this.globals.reason;
    this.lunchvalue = this.globals.lunchvalue;
    this.work = this.globals.work;
    this.lunchi = this.globals.lunchi;
    this.challenges = this.globals.challenges;
    this.onlinefrom = this.globals.onlinefrom;
    this.office = this.globals.office;
    this.home = this.globals.home;
    this.challenge = this.globals.challenge;
    this.missed = this.globals.missed;

    const newfinalRef = this.finalList.push({});
  
    newfinalRef.set({

      
    phone:this.phone,
    email:this.email,
    Preferredmeatvariety:this.variety,
    timemostlikelytoneedtakeoutfood:this.takeaway,
    lunchmostlikelytobuy:this.likelunch,
    lunchchoicetommorow:this.lunchkesho,
    Doyoumisslunch:this.lunches,
    Reasontomisslunch:this.reason,
    otherreason:this.lunchvalue,
    Doyouconcentrateaftermissinglunch:this.work,
    Whydontyoucarrylunchfromhome:this.lunchi,
    Doyouorderfoodonline:this.challenges,
    Wheredoyouorderfoodfrom:this.onlinefrom,
    whyorderfoodattheoffice:this.office,
    whyorderfoodathome:this.home,
    challengeswhileorderingfood:this.challenge,
    Whatareyoumissingfromthefoodyougetnow:this.missed,
    monthlyearnings:this.monthlyearnings,
    foodbudget:this.foodbudget,
    lunch:this.lunch,
    paylunch:this.paylunch,
    lunchcost:this.lunchcost
      
    }).then( newfinal => {
      
    }, 
    error => {
    console.log(error);
    }
    );
    
    alert("Thank you for your contribution in the questionnaire");
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad FinishPage');
    }
 
    }
    

