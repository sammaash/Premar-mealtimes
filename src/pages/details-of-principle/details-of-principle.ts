import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';

/**
 * Generated class for the DetailsOfPrinciplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


interface Person {
    first_name: string, middle_name: string, surname: string, dob: string, 
    marital_status: string, occupation: string, employer: string
}
interface Child {
    name: string, dob: string, fee_balance_pri: number,
    fee_balance_sec: number, fee_balance_uni: number
}

@IonicPage()
@Component({
    selector: 'page-details-of-principle',
    templateUrl: 'details-of-principle.html',
})

export class DetailsOfPrinciplePage {

    selectOptions: any;

    principle: Person = {
        first_name: "", middle_name: "", surname: "", dob: "",
        marital_status: "SI", occupation: "", employer: ""
    };
    spouse: Person = {
        first_name: "", middle_name: "", surname: "", dob: "",
        marital_status: "MA", occupation: "", employer: ""
    };

    children: Child[] = [];
    childrenJson: Child[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public alertController: AlertController, public globals: GlobalsProvider) {
        this.selectOptions = {
            title: 'Country',
            subTitle: 'Select Nationality',
            mode: 'md'
        };

//        this.addChild();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsOfPrinciplePage');
    }

    addChild() {
        let child: Child = {
            name: "", dob: "",
            fee_balance_pri: null,
            fee_balance_sec: null, fee_balance_uni: null
        };
        this.children.push(child);
    }

    nextTab() {
        let message = this.isDataValid();
        if (message == null) {
            this.globals.childrenDetails = this.childrenJson;
            this.globals.spouseDetails = this.spouse;
            this.globals.principleDetails = this.principle;
            this.navCtrl.parent.select(1);
        }
        else
            this.globals.showAlert("Basic Info", message);
    }

    isDataValid(): string {
        this.childrenJson = []; // delete any previous values of children in final JSON object

        // validate principle's details
        if (this.principle.first_name == null || this.principle.first_name.trim() == "")
            return "First Name cannot be blank!";
        //        if (this.principle.middle_name == null || this.principle.middle_name.trim() == "")
        //            return "Middle Name cannot be blank!";
        if (this.principle.surname == null || this.principle.surname.trim() == "")
            return "Surname cannot be blank!";
        if ((this.principle.dob == null || this.principle.dob.trim() == "")
            || !this.globals.isAgeCorrect(this.principle.dob))
            return "Principle's Date of Birth is invalid (might be less than 18 years)!";
//        if (this.principle.nationality == null || this.principle.nationality.trim() == "")
//            return "Nationality cannot be blank!";
//        if (this.principle.id_passport_no == null || this.principle.id_passport_no.trim() == "")
//            return "ID/Passport No. cannot be blank!";
        if (this.principle.marital_status == null || this.principle.marital_status.trim() == "")
            return "Marital Status cannot be blank!";
        if (this.principle.occupation == null || this.principle.occupation.trim() == "")
            return "Principle's Occupation cannot be blank (put N/A if not working)!";
        if (this.principle.employer == null || this.principle.employer.trim() == "")
            return "Principle's Employer cannot be blank (put N/A if not employed)!";

        // validate spouse details
        //        if (this.principle.marital_status == 'MA' 
        //            || this.spouse.first_name != null && this.spouse.first_name.trim() != ""
        //            || this.spouse.surname != null && this.spouse.surname.trim() != ""
        //            || this.spouse.nationality != null && this.spouse.nationality.trim() != ""
        //            || this.spouse.id_passport_no != null && this.spouse.id_passport_no.trim() != "" ) {
        //            
        //            if (this.spouse.first_name == null && this.spouse.first_name.trim() == "")
        //                return "Spouse's First Name cannot be blank!";
        //            if (this.spouse.middle_name == null || this.spouse.middle_name == "")
        //                return "Spouse's Middle Name cannot be blank!";
        //            if (this.spouse.surname == null || this.spouse.surname.trim() == "")
        //                return "Spouse's Surname cannot be blank!";
        if (this.spouse.dob != null && this.spouse.dob.trim() != "" &&
             !this.globals.isAgeCorrect(this.spouse.dob))
            return "Spouse's Date of Birth is invalid (might be less than 18 years)!";
        //            if (this.spouse.nationality == null || this.spouse.nationality.trim() == "")
        //                return "Spouse's Nationality cannot be blank!";
        //            if (this.spouse.id_passport_no == null || this.spouse.id_passport_no.trim() == "")
        //                return "Spouse's ID/Passport No. cannot be blank!";
        //            if (this.spouse.marital_status == null || this.spouse.marital_status.trim() == "")
        //                return "Spouse's Marital Status cannot be blank!";
        //            if (this.spouse.occupation == null || this.spouse.occupation.trim() == "")
        //                return "Spouse's Occupation cannot be blank (put N/A if not working)!";
        //            if (this.spouse.employer == null || this.spouse.employer.trim() == "")
        //                return "Spouse's Employer cannot be blank (put N/A if not employed)!";
        //        }
        let allEmpty = true;
        let allFilled = true;
        let child: any;
        for (child in this.children) {

            allEmpty = true;
            allFilled = true;
            
            if (this.children[child].name != null && this.children[child].name != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.children[child].dob != null && this.children[child].dob != "")
                allEmpty = false;
            else
                allFilled = false;
                
            if (this.children[child].fee_balance_pri == null && this.children[child].fee_balance_pri+"" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.children[child].fee_balance_pri + ""))
                return "Invalid amount in Estimated Remaining Primary School Fee";
            else
                allEmpty = false;
                
            if (this.children[child].fee_balance_sec == null && this.children[child].fee_balance_sec+"" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.children[child].fee_balance_sec + ""))
                return "Invalid amount in Estimated Remaining Secondary School Fee";
            else
                allEmpty = false;
                
            if (this.children[child].fee_balance_uni == null && this.children[child].fee_balance_uni+"" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.children[child].fee_balance_uni + ""))
                return "Invalid amount in Estimated Remaining College/Uni Fee";
            else
                allEmpty = false;
            
            if (allFilled) { // all fields are valid, include child
                this.childrenJson.push(this.children[child]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "A child's details are not complete! Either add the missing details or clear data in the half-filled row.";
            }
        }
    }
}