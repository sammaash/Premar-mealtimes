import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';

interface Contact {
     phone: string,email: string
}



@IonicPage()
@Component({
  templateUrl: 'finish.html',
})
export class FinishPage {

principleContacts: Contact = {
        //        country: "", city: "", estate: "", house_no: "",
         phone: "", email: ""
    }


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public globals: GlobalsProvider) {}

nextTab() {
        let message = this.isDataValid();
        if (message == null) {
            this.globals.contacts = this.principleContacts;
            this.navCtrl.parent.select(2);
        }
        else
            this.globals.showAlert("Contact Info", message);
        //            alert(message); // show error message
    }

    isDataValid(): string {
      
           
        if (!this.globals.isValidPhone(this.principleContacts.phone))
            return "Please enter a valid Phone Number!";
       
        if (!this.globals.isValidEmail(this.principleContacts.email))
            return "Please enter a valid Email Address!";
        return null;
    }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishPage');
  }
 
 
    

}
