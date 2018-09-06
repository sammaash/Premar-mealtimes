import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';

interface Contact {
    //    country: string, city: string, estate: string, house_no: string,
    po_box: string, po_code: string, po_city: string, phone: string, //alt_phone: string,
    email: string
}


@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {

    

    principleContacts: Contact = {
        //        country: "", city: "", estate: "", house_no: "",
        po_box: "", po_code: "", po_city: "", phone: "", //alt_phone: "",
        email: ""
    }

    constructor(public navCtrl: NavController, public globals: GlobalsProvider) {
//        this.globals.tabs.getSelected().name = "Fuck this Shit";
    }

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
        //        if (this.principleContacts.country == null || this.principleContacts.country == "")
        //            return "Country cannot be blank!";
        //        if (this.principleContacts.city == null || this.principleContacts.city == "")
        //            return "City cannot be blank!";
        //        if (this.principleContacts.estate == null || this.principleContacts.estate == "")
        //            return "Estate cannot be blank!";
        //        if (this.principleContacts.house_no == null || this.principleContacts.house_no == "")
        //            return "House Number cannot be blank!";
        if (this.principleContacts.po_box == null || this.principleContacts.po_box == "")
            return "P. O. Box cannot be blank!";
        if (this.principleContacts.po_code == null || this.principleContacts.po_code == "")
            return "Postal Code cannot be blank!";
        if (this.principleContacts.po_city == null || this.principleContacts.po_city == "")
            return "Postal City cannot be blank!";
        if (!this.globals.isValidPhone(this.principleContacts.phone))
            return "Please enter a valid Phone Number!";
        //        if (this.principleContacts.alt_phone == null || this.principleContacts.alt_phone == "")
        //            return "Alternative Phone cannot be blank!";
        if (!this.globals.isValidEmail(this.principleContacts.email))
            return "Please enter a valid Email Address!";
        return null;
    }
}
