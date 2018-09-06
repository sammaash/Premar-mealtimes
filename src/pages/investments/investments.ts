import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';

/**
 * Generated class for the InvestmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export  interface RealEstateAsset {
    type: string, location: string, value: number
}
export  interface VehicleAsset {
    registration: string, make: string, value: number
}
export  interface OtherAsset {
    name: null, value: null
}
export  interface BankAccount {
    type: string, institution: string, value: number
}
//export  interface SaccoAccount {
//    name: string, contribution: number, value: number
//}
export  interface UnitTrust {
    type: string, institution: string, contribution: number, value: number
}
//export  interface Shares {
//    company: string, type: string, contribution: number, value: number
//}
export  interface RetirementSaving {
    institution: string, type: string, contribution: number, value: number, //sum_assured: number,
    //    last_expense_cover: number, pa_cover: number, critical_illness_cover: number
}
export  interface RegularSaving {
    type: string, provider: string, name: string,
    institution: string, contribution: number, value: number, sum_assured: number,
    last_expense_cover: number, pa_cover: number, critical_illness_cover: number
}
export  interface EmployeeBenefit {
    institution: string, type: string, contribution: number, value: number, sum_assured: number,
    last_expense_cover: number, pa_cover: number, critical_illness_cover: number
}
export  interface GroupEmployeeBenefit {
    institution: string, type: string, sum_assured: number,
    last_expense_cover: number, pa_cover: number, critical_illness_cover: number
}

@IonicPage()
@Component({
    selector: 'page-investments',
    templateUrl: 'investments.html',
})
export class InvestmentsPage {

    realEstateAssets: RealEstateAsset[] = [];
    realEstateAssetsJSON: RealEstateAsset[] = [];
    vehicleAssets: VehicleAsset[] = [];
    vehicleAssetsJSON: VehicleAsset[] = [];
    otherAssets: OtherAsset[] = [];
    otherAssetsJSON: OtherAsset[] = [];
    bankAccounts: BankAccount[] = [];
    bankAccountsJSON: BankAccount[] = [];
    //    saccoAccounts: SaccoAccount[] = [];
    //    saccoAccountsJSON: SaccoAccount[] = [];
    unitTrusts: UnitTrust[] = [];
    unitTrustsJSON: UnitTrust[] = [];
    //    shares: Shares[] = [];
    //    sharesJSON: Shares[] = [];
    retirementSavings: RetirementSaving[] = [];
    retirementSavingsJSON: RetirementSaving[] = [];
    regularSavings: RegularSaving[] = [];
    regularSavingsJSON: RegularSaving[] = [];
    employeeBenefits: EmployeeBenefit[] = [];
    employeeBenefitsJSON: EmployeeBenefit[] = [];
    groupEmployeeBenefits: GroupEmployeeBenefit[] = [];
    groupEmployeeBenefitsJSON: GroupEmployeeBenefit[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public globals: GlobalsProvider) {
        //        this.addRea        lEstateAsset();
        //        this.add        VehicleAsset();
        //        this.addBankAccount();

        // deleted fu        nctions
        //        this.addSaccoAcc        ount();
        //        this.addShares();

        //        this.addUnitTrust();
        //        this.addRetirementSaving();
        //        this.addRegularSaving();
        //        this.addEmployeeBenefit();
        //        this.addGroupEmployeeBenefit();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InvestmentsPage');
    }

    addVehicleAsset() {
        let vehicleAsset: VehicleAsset = {registration: null, make: null, value: null};
        this.vehicleAssets.push(vehicleAsset);
    }

    addRealEstateAsset() {
        let realEstateAsset: RealEstateAsset = {type: null, location: null, value: null};
        this.realEstateAssets.push(realEstateAsset);
    }

    addOtherAsset() {
        let otherAsset: OtherAsset = {name: null, value: null};
        this.otherAssets.push(otherAsset);
    }


    addBankAccount() {
        let bankAccount: BankAccount = {type: null, institution: null, value: null};
        this.bankAccounts.push(bankAccount);
    }

    //    addSaccoAccount() {
    //        let saccoAccount: SaccoAccount = {name: null, contribution: null, value: null};
    //        this.saccoAccounts.push(saccoAccount);
    //    }

    addUnitTrust() {
        let unitTrust: UnitTrust = {type: null, institution: null, contribution: null, value: null};
        this.unitTrusts.push(unitTrust);
    }

    //    addShares() {
    //        let share: Shares = {type: null, company: null, contribution: null, value: null};
    //        this.shares.push(share);
    //    }

    addRetirementSaving() {
        let retirementSaving: RetirementSaving = {
            institution: null, type: null, contribution: null, value: null//, sum_assured: null,
            //last_expense_cover: null, pa_cover: null, critical_illness_cover: null
        };
        this.retirementSavings.push(retirementSaving);
    }

    addRegularSaving() {
        let regularSaving: RegularSaving = {
            type: "", provider: null, name: null,
            institution: null, contribution: null, value: null, sum_assured: null,
            last_expense_cover: null, pa_cover: null, critical_illness_cover: null
        };
        this.regularSavings.push(regularSaving);
    }

    addEmployeeBenefit() {
        let employeeBenefit: EmployeeBenefit = {
            institution: null, type: null, contribution: null, value: null, sum_assured: null,
            last_expense_cover: null, pa_cover: null, critical_illness_cover: null
        };
        this.employeeBenefits.push(employeeBenefit);
    }

    addGroupEmployeeBenefit() {
        let groupEmployeeBenefit: GroupEmployeeBenefit = {
            institution: null, type: null, sum_assured: null,
            last_expense_cover: null, pa_cover: null, critical_illness_cover: null
        };
        this.groupEmployeeBenefits.push(groupEmployeeBenefit);
    }

    nextTab() {
        let message = this.isAssetsOwnedValid();
        if (message != null) {
            this.globals.showAlert("Assets Owned -- Real Estate", message);
            return;
        }
        message = this.isOtherAssetsValid();
        if (message != null) {
            this.globals.showAlert("Assets Owned -- Others", message);
            return;
        }
        message = this.isVehiclesOwnedValid();
        if (message != null) {
            this.globals.showAlert("Assets Owned -- Vehicles", message);
            return;
        }
        message = this.isBankAccountsValid();
        if (message != null) {
            this.globals.showAlert("Bank Accounts", message);
            return;
        }
        //        message = this.isSaccoAccountsValid();
        //        if (message != null) {
        //            this.globals.showAlert("SACCO Accounts", message);
        //            return;
        //        }
        message = this.isUnitTrustsValid();
        if (message != null) {
            this.globals.showAlert("Unit Trusts & Mutual Funds", message);
            return;
        }
        //        message = this.isSharesValid();
        //        if (message != null) {
        //            this.globals.showAlert("Shares", message);
        //            return;
        //        }
        message = this.isRetirementSavingsValid();
        if (message != null) {
            this.globals.showAlert("Retirement Savings", message);
            return;
        }
        message = this.isRegularSavingsValid();
        if (message != null) {
            this.globals.showAlert("Regular Savings", message);
            return;
        }
        message = this.isPersonalInsuranceValid();
        if (message != null) {
            this.globals.showAlert("Personal Insurance", message);
            return;
        }
        message = this.isGroupInsuranceValid();
        if (message != null) {
            this.globals.showAlert("Employee Benefits", message);
            return;
        }

        this.globals.investments = {
            realEstateAssets: this.realEstateAssetsJSON,
            otherAssets: this.otherAssetsJSON,
            vehicleAssets: this.vehicleAssetsJSON,
            bankAccounts: this.bankAccountsJSON,
            //            saccoAccounts: this.saccoAccountsJSON,
            unitTrusts: this.unitTrustsJSON,
            //            shares: this.sharesJSON,
            retirementSavings: this.retirementSavingsJSON,
            regularSavings: this.regularSavingsJSON,
            employeeBenefits: this.employeeBenefitsJSON,
            groupEmployeeBenefits: this.groupEmployeeBenefitsJSON
        };
        this.navCtrl.parent.select(5);
    }


    isAssetsOwnedValid(): string {
        this.realEstateAssetsJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let realEstateAsset: any;
        for (realEstateAsset in this.realEstateAssets) {
            allEmpty = true;
            allFilled = true;
            if (this.realEstateAssets[realEstateAsset].type != null
                && this.realEstateAssets[realEstateAsset].type != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.realEstateAssets[realEstateAsset].location != null
                && this.realEstateAssets[realEstateAsset].location != "")
                allEmpty = false;
            else
                allFilled = false;

            if (this.realEstateAssets[realEstateAsset].value == null
                || this.realEstateAssets[realEstateAsset].value + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.realEstateAssets[realEstateAsset].value + ""))
                return "Invalid asset value";
            else
                allEmpty = false;



            if (allFilled) { // all fields are valid, include child
                this.realEstateAssetsJSON.push(this.realEstateAssets[realEstateAsset]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }

    isOtherAssetsValid(): string {
        this.otherAssetsJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let otherAsset: any;
        for (otherAsset in this.otherAssets) {
            allEmpty = true;
            allFilled = true;
            if (this.otherAssets[otherAsset].name != null
                && this.otherAssets[otherAsset].name != "")
                allEmpty = false;
            else
                allFilled = false;

            if (this.otherAssets[otherAsset].value == null
                || this.otherAssets[otherAsset].value + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.otherAssets[otherAsset].value + ""))
                return "Invalid asset value";
            else
                allEmpty = false;



            if (allFilled) { // all fields are valid, include child
                this.otherAssetsJSON.push(this.otherAssets[otherAsset]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }

    isVehiclesOwnedValid(): string {
        this.vehicleAssetsJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let vehicleAsset: any;
        for (vehicleAsset in this.vehicleAssets) {
            allEmpty = true;
            allFilled = true;
            if (this.vehicleAssets[vehicleAsset].registration != null
                && this.vehicleAssets[vehicleAsset].registration != "")
                allEmpty = false;
            else
                allFilled = false;
            //            if (this.vehicleAssets[vehicleAsset].manufacturer != null
            //                && this.vehicleAssets[vehicleAsset].manufacturer != "")
            //                allEmpty = false;
            //            else
            //                allFilled = false;
            if (this.vehicleAssets[vehicleAsset].make != null
                && this.vehicleAssets[vehicleAsset].make != "")
                allEmpty = false;
            else
                allFilled = false;

            if (this.vehicleAssets[vehicleAsset].value == null
                || this.vehicleAssets[vehicleAsset].value + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.vehicleAssets[vehicleAsset].value + ""))
                return "Invalid asset value";
            else
                allEmpty = false;

            if (allFilled) { // all fields are valid, include child
                this.vehicleAssetsJSON.push(this.vehicleAssets[vehicleAsset]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }

    isBankAccountsValid(): string {
        this.bankAccountsJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let bankAccount: any;
        for (bankAccount in this.bankAccounts) {
            allEmpty = true;
            allFilled = true;
            if (this.bankAccounts[bankAccount].type != null
                && this.bankAccounts[bankAccount].type != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.bankAccounts[bankAccount].institution != null
                && this.bankAccounts[bankAccount].institution != "")
                allEmpty = false;
            else
                allFilled = false;

            if (this.bankAccounts[bankAccount].value == null
                || this.bankAccounts[bankAccount].value + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.bankAccounts[bankAccount].value + "", true))
                return "Invalid amount in Value to Date";
            else
                allEmpty = false;

            if (allFilled) { // all fields are valid, include child
                this.bankAccountsJSON.push(this.bankAccounts[bankAccount]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }
    //
    //    isSaccoAccountsValid(): string {
    //        this.saccoAccountsJSON = [];
    //
    //        let allEmpty = true;
    //        let allFilled = true;
    //        let saccoAccount: any;
    //        for (saccoAccount in this.saccoAccounts) {
    //            allEmpty = true;
    //            allFilled = true;
    //            if (this.saccoAccounts[saccoAccount].name != null
    //                && this.saccoAccounts[saccoAccount].name != "")
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //            if (this.saccoAccounts[saccoAccount].contribution != null
    //                && this.saccoAccounts[saccoAccount].contribution + "" != "")
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //            if (this.saccoAccounts[saccoAccount].value != null
    //                && this.saccoAccounts[saccoAccount].value + "" != "")
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //
    //            if (allFilled) { // all fields are valid, include child
    //                this.saccoAccountsJSON.push(this.saccoAccounts[saccoAccount]);
    //            } else if (allEmpty) { // all fields not filled, ignore entry
    //            } else { // partially filled, show notification
    //                return "Details are not complete!";
    //            }
    //        }
    //    }

    isUnitTrustsValid(): string {
        this.unitTrustsJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let unitTrust: any;
        for (unitTrust in this.unitTrusts) {
            allEmpty = true;
            allFilled = true;
            if (this.unitTrusts[unitTrust].type != null
                && this.unitTrusts[unitTrust].type != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.unitTrusts[unitTrust].institution != null
                && this.unitTrusts[unitTrust].institution != "")
                allEmpty = false;
            else
                allFilled = false;

            if (this.unitTrusts[unitTrust].contribution == null
                || this.unitTrusts[unitTrust].contribution + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.unitTrusts[unitTrust].contribution + ""))
                return "Invalid amount in Regular Contribution";
            else
                allEmpty = false;

            if (this.unitTrusts[unitTrust].value == null
                || this.unitTrusts[unitTrust].value + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.unitTrusts[unitTrust].value + ""))
                return "Invalid amount in Value to Date";
            else
                allEmpty = false;

            if (allFilled) { // all fields are valid, include child
                this.unitTrustsJSON.push(this.unitTrusts[unitTrust]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }
    //
    //    isSharesValid(): string {
    //        this.sharesJSON = [];
    //
    //        let allEmpty = true;
    //        let allFilled = true;
    //        let share: any;
    //        for (share in this.shares) {
    //            allEmpty = true;
    //            allFilled = true;
    //            if (this.shares[share].company != null
    //                && this.shares[share].company != "")
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //            if (this.shares[share].type != null
    //                && this.shares[share].type != "")
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //            if (this.shares[share].contribution != null
    //                && this.shares[share].contribution + "" != "")
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //            if (this.shares[share].value != null
    //                && this.shares[share].value + "" != "")
    //                allEmpty = false;
    //            else
    //                allFilled = false;
    //
    //            if (allFilled) { // all fields are valid, include child
    //                this.sharesJSON.push(this.shares[share]);
    //            } else if (allEmpty) { // all fields not filled, ignore entry
    //            } else { // partially filled, show notification
    //                return "Details are not complete!";
    //            }
    //        }
    //    }

    isRetirementSavingsValid(): string {
        this.retirementSavingsJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let retirementSaving: any;
        for (retirementSaving in this.retirementSavings) {
            allEmpty = true;
            allFilled = true;
            if (this.retirementSavings[retirementSaving].institution != null
                && this.retirementSavings[retirementSaving].institution != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.retirementSavings[retirementSaving].type != null
                && this.retirementSavings[retirementSaving].type + "" != "")
                allEmpty = false;
            else
                allFilled = false;

            if (this.retirementSavings[retirementSaving].contribution == null
                || this.retirementSavings[retirementSaving].contribution + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.retirementSavings[retirementSaving].contribution + ""))
                return "Invalid amount in Regular Contribution";
            else
                allEmpty = false;

            if (this.retirementSavings[retirementSaving].value == null
                || this.retirementSavings[retirementSaving].value + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.retirementSavings[retirementSaving].value + ""))
                return "Invalid amount in Value to Date";
            else
                allEmpty = false;

            //            if (this.retirementSavings[retirementSaving].sum_assured != null
            //                && this.retirementSavings[retirementSaving].sum_assured + "" != "")
            //                allEmpty = false;
            //            else
            //                allFilled = false;
            //            if (this.retirementSavings[retirementSaving].last_expense_cover != null
            //                && this.retirementSavings[retirementSaving].last_expense_cover + "" != "")
            //                allEmpty = false;
            //            else
            //                allFilled = false;
            //            if (this.retirementSavings[retirementSaving].pa_cover != null
            //                && this.retirementSavings[retirementSaving].pa_cover + "" != "")
            //                allEmpty = false;
            //            else
            //                allFilled = false;
            //            if (this.retirementSavings[retirementSaving].critical_illness_cover != null
            //                && this.retirementSavings[retirementSaving].critical_illness_cover + "" != "")
            //                allEmpty = false;
            //            else
            //                allFilled = false;

            if (allFilled) { // all fields are valid, include child
                this.retirementSavingsJSON.push(this.retirementSavings[retirementSaving]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }

    isRegularSavingsValid(): string {
        this.regularSavingsJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let regularSaving: any;
        for (regularSaving in this.regularSavings) {
            allEmpty = true;
            allFilled = true;

            if (this.regularSavings[regularSaving].type != null
                && this.regularSavings[regularSaving].type != "")
                allEmpty = false;
            else
                allFilled = false;

            if (this.regularSavings[regularSaving].type.indexOf('OTHER') >= 0
                || this.regularSavings[regularSaving].type.indexOf('SACCO') >= 0) {
                if (this.regularSavings[regularSaving].name != null
                    && this.regularSavings[regularSaving].name != "")
                    allEmpty = false;
                else
                    allFilled = false;
            } else {
                this.regularSavings[regularSaving].name = null;
            }

            if (this.regularSavings[regularSaving].type.indexOf('SHARE') >= 0) {
                if (this.regularSavings[regularSaving].institution != null
                    && this.regularSavings[regularSaving].institution != "")
                    allEmpty = false;
                else
                    allFilled = false;
            } else {
                this.regularSavings[regularSaving].institution = null;
            }

            if (this.regularSavings[regularSaving].type.indexOf('OTHER') >= 0) {
                if (this.regularSavings[regularSaving].provider != null
                    && this.regularSavings[regularSaving].provider != "")
                    allEmpty = false;
                else
                    allFilled = false;
            } else {
                this.regularSavings[regularSaving].provider = null;
            }

            if (this.regularSavings[regularSaving].type.indexOf('_REG') > 0) {
                if (this.regularSavings[regularSaving].contribution == null
                    && this.regularSavings[regularSaving].contribution + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.regularSavings[regularSaving].contribution + ""))
                    return "Invalid amount in Regular Contribution";
                else
                    allEmpty = false;
            }

            if (this.regularSavings[regularSaving].value == null
                || this.regularSavings[regularSaving].value + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.regularSavings[regularSaving].value + ""))
                return "Invalid amount in Value to Date";
            else
                allEmpty = false;

            if (this.regularSavings[regularSaving].type.indexOf('OTHER') >= 0) {
                if (this.regularSavings[regularSaving].sum_assured == null
                    || this.regularSavings[regularSaving].sum_assured + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.regularSavings[regularSaving].sum_assured + ""))
                    return "Invalid amount in Sum Assured";
                else
                    allEmpty = false;

                if (this.regularSavings[regularSaving].last_expense_cover == null
                    || this.regularSavings[regularSaving].last_expense_cover + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.regularSavings[regularSaving].last_expense_cover + ""))
                    return "Invalid amount in Last Expense Cover";
                else
                    allEmpty = false;

                if (this.regularSavings[regularSaving].pa_cover == null
                    || this.regularSavings[regularSaving].pa_cover + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.regularSavings[regularSaving].pa_cover + ""))
                    return "Invalid amount in PA Cover";
                else
                    allEmpty = false;

                if (this.regularSavings[regularSaving].critical_illness_cover == null
                    || this.regularSavings[regularSaving].critical_illness_cover + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.regularSavings[regularSaving].critical_illness_cover + ""))
                    return "Invalid amount in Critical Illness Cover";
                else
                    allEmpty = false;
            } else {
                this.regularSavings[regularSaving].sum_assured = -999;
                this.regularSavings[regularSaving].last_expense_cover = -999;
                this.regularSavings[regularSaving].pa_cover = -999;
                this.regularSavings[regularSaving].critical_illness_cover = -999;
            }

            if (allFilled) { // all fields are valid, include child
                this.regularSavingsJSON.push(this.regularSavings[regularSaving]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }

    isPersonalInsuranceValid(): string {
        this.employeeBenefitsJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let employeeBenefit: any;
        for (employeeBenefit in this.employeeBenefits) {
            allEmpty = true;
            allFilled = true;
            if (this.employeeBenefits[employeeBenefit].institution != null
                && this.employeeBenefits[employeeBenefit].institution != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.employeeBenefits[employeeBenefit].type != null
                && this.employeeBenefits[employeeBenefit].type != "")
                allEmpty = false;
            else
                allFilled = false;


            if (this.employeeBenefits[employeeBenefit].type == 'LFC') {
                if (this.employeeBenefits[employeeBenefit].contribution == null
                    || this.employeeBenefits[employeeBenefit].contribution + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.employeeBenefits[employeeBenefit].contribution + ""))
                    return "Invalid amount in Regular Contribution";
                else
                    allEmpty = false;

                if (this.employeeBenefits[employeeBenefit].value == null
                    || this.employeeBenefits[employeeBenefit].value + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.employeeBenefits[employeeBenefit].value + ""))
                    return "Invalid amount in Value to Date";
                else
                    allEmpty = false;
            } else {
                this.employeeBenefits[employeeBenefit].contribution = -999;
                this.employeeBenefits[employeeBenefit].value = -999;
            }

            if (this.employeeBenefits[employeeBenefit].type != 'D') {
                if (this.employeeBenefits[employeeBenefit].sum_assured == null
                    || this.employeeBenefits[employeeBenefit].sum_assured + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.employeeBenefits[employeeBenefit].sum_assured + ""))
                    return "Invalid amount in Sum Assured";
                else
                    allEmpty = false;


                if (this.employeeBenefits[employeeBenefit].last_expense_cover == null
                    || this.employeeBenefits[employeeBenefit].last_expense_cover + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.employeeBenefits[employeeBenefit].last_expense_cover + ""))
                    return "Invalid amount in Last Expense Cover";
                else
                    allEmpty = false;
            } else {
                this.employeeBenefits[employeeBenefit].sum_assured = -999;
                this.employeeBenefits[employeeBenefit].last_expense_cover = -999;
            }

            if (this.employeeBenefits[employeeBenefit].type == 'LFC'
                || this.employeeBenefits[employeeBenefit].type == 'H') {
                if (this.employeeBenefits[employeeBenefit].pa_cover == null
                    || this.employeeBenefits[employeeBenefit].pa_cover + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.employeeBenefits[employeeBenefit].pa_cover + ""))
                    return "Invalid amount in PA Cover";
                else
                    allEmpty = false;
            } else {
                this.employeeBenefits[employeeBenefit].pa_cover = -999;
            }

            if (this.employeeBenefits[employeeBenefit].type != 'D') {
                if (this.employeeBenefits[employeeBenefit].critical_illness_cover == null
                    || this.employeeBenefits[employeeBenefit].critical_illness_cover + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.employeeBenefits[employeeBenefit].critical_illness_cover + ""))
                    return "Invalid amount in Critical Illness Cover";
                else
                    allEmpty = false;
            } else {
                this.employeeBenefits[employeeBenefit].critical_illness_cover = -999;
            }



            if (allFilled) { // all fields are valid, include child
                this.employeeBenefitsJSON.push(this.employeeBenefits[employeeBenefit]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }

    isGroupInsuranceValid(): string {
        this.groupEmployeeBenefitsJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let groupEmployeeBenefit: any;
        for (groupEmployeeBenefit in this.groupEmployeeBenefits) {
            allEmpty = true;
            allFilled = true;
            if (this.groupEmployeeBenefits[groupEmployeeBenefit].institution != null
                && this.groupEmployeeBenefits[groupEmployeeBenefit].institution != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.groupEmployeeBenefits[groupEmployeeBenefit].type != null
                && this.groupEmployeeBenefits[groupEmployeeBenefit].type != "")
                allEmpty = false;
            else
                allFilled = false;


            if (this.groupEmployeeBenefits[groupEmployeeBenefit].sum_assured == null
                || this.groupEmployeeBenefits[groupEmployeeBenefit].sum_assured + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.groupEmployeeBenefits[groupEmployeeBenefit].sum_assured + ""))
                return "Invalid amount in Sum Assured";
            else
                allEmpty = false;


            if (this.groupEmployeeBenefits[groupEmployeeBenefit].last_expense_cover == null
                || this.groupEmployeeBenefits[groupEmployeeBenefit].last_expense_cover + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.groupEmployeeBenefits[groupEmployeeBenefit].last_expense_cover + ""))
                return "Invalid amount in Last Expense Cover";
            else
                allEmpty = false;

            if (this.groupEmployeeBenefits[groupEmployeeBenefit].type != 'GPA') {
                if (this.groupEmployeeBenefits[groupEmployeeBenefit].pa_cover == null
                    || this.groupEmployeeBenefits[groupEmployeeBenefit].pa_cover + "" == "")
                    allFilled = false;
                else if (!this.globals.isValidAmount(this.groupEmployeeBenefits[groupEmployeeBenefit].pa_cover + ""))
                    return "Invalid amount in PA Cover";
                else
                    allEmpty = false;
            } else {
                this.groupEmployeeBenefits[groupEmployeeBenefit].pa_cover = -999; // GPA
            }

            if (this.groupEmployeeBenefits[groupEmployeeBenefit].critical_illness_cover == null
                || this.groupEmployeeBenefits[groupEmployeeBenefit].critical_illness_cover + "" == "")
                allFilled = false;
            else if (!this.globals.isValidAmount(this.groupEmployeeBenefits[groupEmployeeBenefit].critical_illness_cover + ""))
                return "Invalid amount in Critical Illness Cover";
            else
                allEmpty = false;



            if (allFilled) { // all fields are valid, include child
                this.groupEmployeeBenefitsJSON.push(this.groupEmployeeBenefits[groupEmployeeBenefit]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }
}