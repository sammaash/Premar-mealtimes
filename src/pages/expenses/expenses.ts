import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';

/**
 * Generated class for the ExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//
//interface Expense {
//    institution: string, repaymentAmount: string, frequency: 0, outstanding: number
//}
interface Loan {
    type: string, institution: string, repaymentAmount: number, frequency: 0, outstanding: number, is_mortgage: boolean
}
interface MonthlyExpense {
    rent: number, utilities: number, food: number, clothing: number, transport: number,
    entertainment: number, others: number
}

@IonicPage()
@Component({
    selector: 'page-expenses',
    templateUrl: 'expenses.html',
})
export class ExpensesPage {

    //    expenses: Expense[] = [];
    //    expensesJSON: Expense[] = [];
    loans: Loan[] = [];
    loansJSON: Loan[] = [];
    monthlyExpenses: MonthlyExpense = {
        rent: null, utilities: null, food: null, clothing: null, transport: null,
        entertainment: null, others: null
    }

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public globals: GlobalsProvider) {
        //        this.addExpense();
        //        this.addLoan();
    }

    //    addExpense() {
    //        let expense: Expense = {institution: null, repaymentAmount: null, frequency: null, outstanding: null};
    //        this.expenses.push(expense);
    //    }


    addLoan(isMortgage: boolean) {
        let loan: Loan;
        if (isMortgage) {
            loan = {
                type: "--mortgage--", institution: null, repaymentAmount: null,
                frequency: null, outstanding: null, is_mortgage: true
            };
        } else {
            loan = {
                type: null, institution: null, repaymentAmount: null,
                frequency: null, outstanding: null, is_mortgage: false
            };
        }
        this.loans.push(loan);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExpensesPage');
    }

    nextTab() {
        //        let message = this.isHousingExpensesValid();
        //        if (message != null) {
        //            this.globals.showAlert("Housing Expenses -- Rent/Mortgage", message);
        //            return;
        //        }
        let message = this.isMonthlyLivingExpensesValid();
        if (message != null) {
            this.globals.showAlert("Monthly Living Expenses", message);
            return;
        }
        message = this.isLoanRepaymentDetailsValid();
        if (message != null) {
            this.globals.showAlert("Loan Repayment Details", message);
            return;
        }

        this.globals.expenses = {
            monthlyExpenses: this.monthlyExpenses,
            //            housingExpenses: this.expensesJSON,
            loanExpenses: this.loansJSON
        };

        this.navCtrl.parent.select(4);
    }

    //
    //    isHousingExpensesValid(): string {
    //        this.expensesJSON = [];
    //
    //        let allEmpty = true;
    //        let allFilled = true;
    //        let expense: any;
    //        for (expense in this.expenses) {
    //            allEmpty = true;
    //            allFilled = true;
    //            if (this.expenses[expense].institution != null && this.expenses[expense].institution != "")
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //            if (this.expenses[expense].repaymentAmount != null)
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //            if (this.expenses[expense].frequency != null)
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //            if (this.expenses[expense].outstanding != null)
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //
    //            if (allFilled) { // all fields are valid, include child
    //                this.expensesJSON.push(this.expenses[expense]);
    //            } else if (allEmpty) { // all fields not filled, ignore entry
    //            } else { // partially filled, show notification
    //                return "An expense's details are not complete!";
    //            }
    //        }
    //    }
    //

    isMonthlyLivingExpensesValid(): string {
        // validate monthly expenses
        if (!this.globals.isValidAmount(this.monthlyExpenses.rent + ""))
            return "Value of Rent Expense is Invalid!";
        if (!this.globals.isValidAmount(this.monthlyExpenses.utilities + ""))
            return "Value of Utilities Expense is Invalid!";
        if (!this.globals.isValidAmount(this.monthlyExpenses.food + ""))
            return "Value of Food Expense is Invalid!";
        if (!this.globals.isValidAmount(this.monthlyExpenses.clothing + ""))
            return "Value of Clothing Expense is Invalid!";
        if (!this.globals.isValidAmount(this.monthlyExpenses.transport + ""))
            return "Value of Transport Expense is Invalid!";
        if (!this.globals.isValidAmount(this.monthlyExpenses.entertainment + ""))
            return "Value of Entertainment Expense is Invalid!";
        if (!this.globals.isValidAmount(this.monthlyExpenses.others + ""))
            return "Value of Other Expense(s) is Invalid!";
    }

    isLoanRepaymentDetailsValid(): string {
        this.loansJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let loan: any;
        for (loan in this.loans) {
            allEmpty = true;
            allFilled = true;
            if (this.loans[loan].institution != null && this.loans[loan].institution != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.loans[loan].type != null && this.loans[loan].type != "")
                allEmpty = false;
            else
                allFilled = false;
                 
            if (this.loans[loan].repaymentAmount == null || this.loans[loan].repaymentAmount+"" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.loans[loan].repaymentAmount + ""))
                return "Invalid value of Repayment Amount: " + this.loans[loan].repaymentAmount;
            else
                allEmpty = false;
                
            if (this.loans[loan].frequency != null)
                allEmpty = false;
            else
                allFilled = false;
                
            if (this.loans[loan].outstanding == null || this.loans[loan].outstanding+"" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.loans[loan].outstanding + ""))
                return "Invalid value of Outstanding Amount: " + this.loans[loan].outstanding;
            else
                allEmpty = false;

            if (allFilled) { // all fields are valid, include child
                this.loansJSON.push(this.loans[loan]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }
}