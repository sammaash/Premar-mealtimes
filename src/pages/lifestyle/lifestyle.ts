import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';

 interface Life {
     missed: string,lunch: string,office: string,
     home: string,takeaway: string,work: string,
     food: string,challenge: string
}
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
export class LifestylePage {


misslunchs: misslunch[] = [];
    misslunchsJSON: misslunch[] = [];
    reasones: reasone[] = [];
    reasonesJSON: reasone[] = [];
    reasone2s: reasone2[] = [];
    reasone2sJSON: reasone2[] = [];
    lunches: number = 0;

principleLifestyle: Life = {
         
         missed: "",lunch:"",office:"",home:"",
         takeaway:"",work:"",food:"",challenge:""
    }


challenges: number = 0;
 selectOptions: any;
 selectOptions_indemnity: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public globals: GlobalsProvider) {
  this.addmisslunch();
        this.addreasone();
        this.addreasone2();



   }

nextTab() {
        let message = this.isDataValid();
        if (message == null) {
            this.globals.contacts = this.principleLifestyle;
            this.navCtrl.parent.select(2);
        }
        else
            this.globals.showAlert("Lifestyle  Info", message);
        //            alert(message); // show error message
    }

    isDataValid(): string {
     
        if (!this.globals.isBlank1(this.principleLifestyle.missed))
            return "Please fill variety missed field";

       if (!this.globals.isBlank2(this.principleLifestyle.lunch))
            return "Please fill the packed lunch field";

       if (!this.globals.isBlank3(this.principleLifestyle.office))
            return "Please fill the  office field";

       if (!this.globals.isBlank4(this.principleLifestyle.home))
            return "Please fill the  home field";

       if (!this.globals.isBlank5(this.principleLifestyle.takeaway))
            return "Please fill the  takeaway field";

       if (!this.globals.isBlank6(this.principleLifestyle.work))
            return "Please fill the  work field";

       if (!this.globals.isBlank7(this.principleLifestyle.food))
            return "Please fill the packed food field";

       if (!this.globals.isBlank8(this.principleLifestyle.challenge))
            return "Please fill the packed challenge field";

                                     
        
    }


  


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
