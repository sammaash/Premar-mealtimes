import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalsProvider } from '../../providers/globals/globals';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LifestylePage } from '../lifestyle/lifestyle';

/**
* Generated class for the BudgetPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/


@IonicPage()
@Component({
    selector: 'page-budget',
    templateUrl: 'budget.html',
})

export class BudgetPage {
    monthlyearnings: string = "";
    foodbudget: string = "";
    lunch: string = "";
    paylunch: string = "";
    lunchcost: string = "";

    budgetList: AngularFireList<any>;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public globals: GlobalsProvider,
        public afDatabase: AngularFireDatabase) {
        this.budgetList = afDatabase.list('/budget');
    }

    ionViewDidLeave() {
        if (this.hasNulls()) {
            this.globals.showToast("Please answer all questions in the \'Budget\' tab");
            return; // this tab is not completely filled
        }
        this.nextTab(this.monthlyearnings, this.foodbudget, this.lunch, this.paylunch, this.lunchcost);
    }

    hasNulls(): boolean {
        if (
            this.globals.isNullVal(this.monthlyearnings) ||
            this.globals.isNullVal(this.foodbudget) ||
            this.globals.isNullVal(this.lunch) ||
            this.globals.isNullVal(this.paylunch) ||
            this.globals.isNullVal(this.lunchcost)
        ) {
            return true;
        }
        this.globals.isBudgetReady = true;
        return false;
    }

    nextTab(monthlyearnings, foodbudget, lunch, paylunch, lunchcost) {

        if (this.hasNulls()) {
            this.globals.showToast('Please answer all questions.');
            return; // this tab is not completely filled
        }

        let newBudgetRef;
        if (this.globals.firebaseRef != null) { // if we already have Firebase key for this session, use it
            newBudgetRef = this.budgetList.push({ name: this.globals.firebaseRef });
        } else {
            newBudgetRef = this.budgetList.push({}); // else generate new key and save it as a global variable
            this.globals.firebaseRef = newBudgetRef.key;
        }

        newBudgetRef.set({
            monthlyearnings: this.monthlyearnings,
            foodbudget: this.foodbudget,
            lunch: this.lunch,
            paylunch: this.paylunch,
            lunchcost: this.lunchcost

        }).then(newBudget => {
            this.globals.showToast("Successfully saved 'Budget' tab details.", 'bottom');
        }, error => {
            this.globals.showToast("Failed to save, please check your internet connection.", 'bottom');
        });
        this.navCtrl.parent.select(1);

        this.navCtrl.push(LifestylePage);

    }
}