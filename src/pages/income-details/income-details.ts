import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';

/**
 * Generated class for the IncomeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


interface ExtraIncome {
    source: string; amount: number; frequency: 0;
}
interface Income {
    principle: number; spouse: number;
    extra: ExtraIncome[]
}

@IonicPage()
@Component({
    selector: 'page-income-details',
    templateUrl: 'income-details.html',
})
export class IncomeDetailsPage {

    income: Income = {principle: null, spouse: null, extra: []};
    extraJSON: ExtraIncome[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public globals: GlobalsProvider) {
        //        this.addIncome();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IncomeDetailsPage');
    }


    addIncome() {
        let extra: ExtraIncome = {source: "", amount: null, frequency: null};
        this.income.extra.push(extra);
    }

    nextTab() {
        let message = this.isDataValid();
        if (message != null) {
            this.globals.showAlert("Income Details", message);
        } else {
            this.globals.income = {
                "income": this.income,
                "extra": this.extraJSON
            };

            this.globals.income.income = this.income;
            this.navCtrl.parent.select(3);
        }
    }

    isDataValid(): string {
        this.extraJSON = []; // delete any previous values of children in final JSON object

        // validate principle's details
        if (!this.globals.isValidAmount(this.income.principle + ""))
            return "Value of Principle's Salary is Invalid!";
        if (this.globals.principleDetails != null &&
            this.globals.principleDetails.marital_status == "MA" &&
            !this.globals.isValidAmount(this.income.spouse + ""))
            return "Value of Spouse's Salary is Invalid!";

        let allEmpty = true;
        let allFilled = true;
        let extra: any;
        for (extra in this.income.extra) {
            if (this.income.extra[extra].source != null && this.income.extra[extra].source != "")
                allEmpty = false;
            else
                allFilled = false;

            if (this.income.extra[extra].amount == null || this.income.extra[extra].amount + "" == "") // null or empty string
                allFilled = false;
            // check if amounts are valid numbers ( > 0 )
            else if (!this.globals.isValidAmount(this.income.extra[extra].amount + ""))
                return "Invalid value of Income Amount!";
            else
                allEmpty = false;

            if (this.income.extra[extra].frequency != null)
                allEmpty = false;
            else
                allFilled = false;

            if (allFilled) {
                this.extraJSON.push(this.income.extra[extra]); // all fields are valid, include child
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "An extra income's details are not complete!";
            }
        }
    }
}