import {Component, ViewChild} from '@angular/core';
import {Tabs} from 'ionic-angular';

//import {ExpensesPage} from '../expenses/expenses';
//import {ContactPage} from '../contact/contact';
//import {InvestmentsPage} from '../investments/investments';
import {ConfirmationPage} from '../confirmation/confirmation';
import { LifestylePage } from '../lifestyle/lifestyle'; 
import { FinishPage } from '../finish/finish'; 
import { BudgetPage } from '../budget/budget';



import {DetailsOfPrinciplePage} from '../details-of-principle/details-of-principle';
//import { SpouseDetailsPage } from '../spouse-details/spouse-details';
//import { ChildrenDetailsPage } from '../children-details/children-details';
//import {IncomeDetailsPage} from '../income-details/income-details';
import {GlobalsProvider} from '../../providers/globals/globals';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    @ViewChild('navTabs') tabRef: Tabs;

    tab1Root = DetailsOfPrinciplePage;
    tab2Root = FinishPage;
   tab3Root = LifestylePage;
//    tab4Root = ExpensesPage;
//    tab5Root = InvestmentsPage;
    tab6Root = ConfirmationPage;
    tab7Root = BudgetPage

    constructor(public globals: GlobalsProvider) {
        this.globals.tabs = this.tabRef;
        console.log(this.tabRef);
    }
}
