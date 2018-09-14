import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { LifestylePage } from '../lifestyle/lifestyle'; 
import { FinishPage } from '../finish/finish'; 

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

    nextTab(monthlyearnings,foodbudget,lunch,paylunch,lunchcost){
    
    //if (typeof(budgetlist) === "null") {
    const newBudgetRef = this.budgetList.push({});
    this.globals.firebaseRef = newBudgetRef;
  
    newBudgetRef.set({
    monthlyearnings:this.monthlyearnings,
    foodbudget:this.foodbudget,
    lunch:this.lunch,
    paylunch:this.paylunch,
    lunchcost:this.lunchcost
      
    }).then( newBudget => {
    //this.navCtrl.pop();
    }, error => {
    console.log(error);
    });
    this.navCtrl.parent.select(1);
 
    //}
    //else{
    //this.navCtrl.parent.select(1);
    //}

    this.navCtrl.push(LifestylePage,{
    monthlyearnings:monthlyearnings,
    foodbudget:foodbudget,
    lunch:lunch,
    paylunch:paylunch,
    lunchcost:lunchcost
    });

    }
  
    //nextTab() {








    //this.navCtrl.parent.select(1);
        
    //}
   

    ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
    }

    }

