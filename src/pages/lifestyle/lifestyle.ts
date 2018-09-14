import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FinishPage } from '../finish/finish'; 
 
interface misslunch {
    lunchvalue: string
}
interface reasone{
    lunchvalue: null
    }
interface reasone2{
    lunchvalue: null
    }
@IonicPage()
@Component({
  selector: 'page-lifestyle',
  templateUrl: 'lifestyle.html',
})
export class LifestylePage 
{

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
    




 selectOptions: any;
 selectOptions_indemnity: any;

  lifestyleList: AngularFireList<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public globals: GlobalsProvider,
  public afDatabase: AngularFireDatabase) {
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


this.addmisslunch();
        this.addreasone();
        this.addreasone2();

  
this.lifestyleList = afDatabase.list('/lifestyle');
   
    }


   
  

   

nextTab(variety,takeaway,likelunch,lunchkesho,lunches,reason,lunchvalue,work,lunchi,challenges,onlinefrom,office,home,challenge,missed) {
 //monthlyearnings: string = "";


   this.monthlyearnings = this.globals.monthlyearnings;
   this.foodbudget = this.globals.foodbudget;
   this.lunch = this.globals.lunch;
   this.paylunch = this.globals.paylunch;
   this.lunchcost = this.globals.lunchcost;


  //const newlifestyleRef = this.lifestyleList.push({});
  const newlifestyleRef = this.lifestyleList.push({ name: this.globals.firebaseRef });
      
  
  newlifestyleRef.set({

      
      //
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
      lunchcost:this.lunchcost,
      
    }).then( newlifestyle => {
      
    }, 
    error => {
    console.log(error);
    }
    );
    this.navCtrl.parent.select(2);


    this.navCtrl.push(FinishPage, {
      variety:this.variety,
      takeaway:this.takeaway,
      likelunch:this.likelunch,
      lunchkesho:this.lunchkesho,
      lunches:this.lunches,
      reason:this.reason,
      lunchvalue:this.lunchvalue,
      work:this.work,
      lunchi:this.lunchi,
      challenges:this.challenges,
      onlinefrom:this.onlinefrom,
      office:this.office,
      home:this.home,
      challenge:this.challenge,
      missed:this.missed,
      monthlyearnings:this.monthlyearnings,
      foodbudget:this.foodbudget,
      lunch:this.lunch,
      paylunch:this.paylunch,
      lunchcost:this.lunchcost,
});
 




    }

    //isDataValid(): string {
     
      //  if (!this.globals.isBlank1(this.principleLifestyle.missed))
        //    return "Please fill variety missed field";

       //if (!this.globals.isBlank2(this.principleLifestyle.lunch))
         //   return "Please fill the packed lunch field";

       //if (!this.globals.isBlank3(this.principleLifestyle.office))
         //   return "Please fill the  office field";

       //if (!this.globals.isBlank4(this.principleLifestyle.home))
         //   return "Please fill the  home field";

       //if (!this.globals.isBlank5(this.principleLifestyle.takeaway))
         //   return "Please fill the  takeaway field";

       //if (!this.globals.isBlank6(this.principleLifestyle.work))
         //   return "Please fill the  work field";

       //if (!this.globals.isBlank7(this.principleLifestyle.food))
         //   return "Please fill the packed food field";

       //if (!this.globals.isBlank8(this.principleLifestyle.challenge))
         //   return "Please fill the packed challenge field";

                                     
        
    //}


  
    


  ionViewDidLoad() {
    console.log('ionViewDidLoad LifestylePage');
  }
addmisslunch() {
        let misslunch: misslunch = {
            lunchvalue: null
            
        };
        this.misslunchs.push(misslunch);
    }
    addreasone() {
        let reasone: reasone = {
            lunchvalue: null
        };
        this.reasones.push(reasone);
    }
    addreasone2() {
        let reasone2: reasone2 = {
            lunchvalue: null
        };
        this.reasone2s.push(reasone2);
    }

}
