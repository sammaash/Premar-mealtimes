import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';

/**
 * Generated class for the BudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface misslunch {
    lunchvalue: string
}
interface reasone{
    lunchvalue: null
    }
    
@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {


misslunchs: misslunch[] = [];
    misslunchsJSON: misslunch[] = [];
    reasones: reasone[] = [];
    reasonesJSON: reasone[] = [];
    lunches: number = 0;
    monthlyearnings: string = "Below 10,000";
    foodbudget: string = "Below 5,000";
    lunch: string = "100 and below";
    paylunch: string = "YES";
    lunchcost: string = "100 and below";


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public globals: GlobalsProvider) {
        
        this.addmisslunch();
        this.addreasone();

  }
  
  nextTab() {
            this.navCtrl.parent.select(1);
        
        }
   

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
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
}

