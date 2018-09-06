import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalsProvider} from '../../providers/globals/globals';

/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


interface TravelInsurance {
    institution: string, last_expense_cover: number, pa_cover: number, critical_illness_cover: number
}
interface IndemnityInsurance {
    institution: null
};
@IonicPage()
@Component({
    selector: 'page-confirmation',
    templateUrl: 'confirmation.html',
})
export class ConfirmationPage {


    travelInsurances: TravelInsurance[] = [];
    travelInsurancesJSON: TravelInsurance[] = [];
    indemnityInsurances: IndemnityInsurance[] = [];
    indemnityInsurancesJSON: IndemnityInsurance[] = [];
    travelsForLong: number = 0;
    requiresIndemnity: number = 0;
    hasWill: number = 0;
    selectOptions: any;
    selectOptions_indemnity: any;
    lastWillUpdateDate: string;
    financialPriority: string = "RETIREMENT";
    
    //    riskRating: number = 3;

    ratings: {label: string, description: string}[] = [
        {label: "Low Risk Rating", description: "These investments are for investors who require a high degree of capital preservation. They offer low risk and low growth potential."},
        {label: "Medium/Low Risk Rating", description: "These investments are for investors seeking protection of capital as well as capital growth. It should however be noted that these investments may have some volatility."},
        {label: "Medium Risk Rating", description: "These investments are for investors seeking the potential of growth of capital. However, it should be noted that the potential for growth is balanced by the increased risk of volatility."},
        {label: "Medium/High Risk Rating", description: "These investments are for investors seeking the potential of superior growth of capital. However, it should be noted that volatility in these investments increases the risk of loss."},
        {label: "High Risk Rating", description: "These investments are for investors seeking the possibility of fast appreciation of capital. However, it should be noted that although these investments have the potential of delivering high returns, this can be offset by large falls during periods of adverse volatility."}
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public globals: GlobalsProvider) {


        
        this.selectOptions = {
            title: 'Nature of Travel',
            subTitle: 'Do You Travel for Long?',
            mode: 'md'
        };

        this.selectOptions_indemnity = {
            title: 'Requires Indemnity?',
            mode: 'md'
        };

        this.addTravelInsurance();
        this.addIndemnityInsurance();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ConfirmationPage');
    }
    

    addTravelInsurance() {
        let travelInsurance: TravelInsurance = {
            institution: null,
            last_expense_cover: null, pa_cover: null, critical_illness_cover: null
        };
        this.travelInsurances.push(travelInsurance);
    }

    addIndemnityInsurance() {
        let indemnityInsurance: IndemnityInsurance = {
            institution: null
        };
        this.indemnityInsurances.push(indemnityInsurance);
    }

    requestSolePlanning() {
        this.requestPlanning("sole");
    }

    requestJointPlanning() {
        this.requestPlanning("joint");
    }

    requestPlanning(planningType: string) {
        if (this.isTravelInsuranceValid() != null) {
            this.globals.showAlert("Travel Insurance", this.isTravelInsuranceValid());
            return;
        }
        if (this.isIndemnityInsuranceValid() != null) {
            this.globals.showAlert("Indemnity Insurance", this.isIndemnityInsuranceValid());
            return;
        }

        this.globals.confirmation = {
            planningType: planningType,
            //            riskRating: this.riskRating,
            travelsForLong: this.travelsForLong,
            travelInsurances: this.travelInsurancesJSON,
            requiresIndemnity: this.requiresIndemnity,
            indemnityInsurances: this.indemnityInsurancesJSON,
            hasWill: this.hasWill,
            lastWillUpdateDate: this.lastWillUpdateDate,
            financialPriority: this.financialPriority
        };

        if (this.globals.principleDetails == null
            || this.globals.spouseDetails == null
            || this.globals.childrenDetails == null) {
            this.globals.showAlert("Missing Details",
                "Basic Info tab details have not been completely filled.");
            return;
        } else if (this.globals.contacts == null) {
            this.globals.showAlert("Missing Details",
                "Contacts tab details have not been completely filled.");
            return;
        } else if (this.globals.income == null) {
            this.globals.showAlert("Missing Details",
                "Income tab details have not been completely filled.");
            return;
        } else if (this.globals.expenses == null) {
            this.globals.showAlert("Missing Details",
                "Expenses tab details have not been completely filled.");
            return;
        } else if (this.globals.investments == null) {
            this.globals.showAlert("Missing Details",
                "Investment tab details have not been completely filled.");
            return;
        }

        let jsonMessage: any = {
            childrenDetails: this.globals.childrenDetails,
            spouseDetails: this.globals.spouseDetails,
            principleDetails: this.globals.principleDetails,
            income: this.globals.income,
            contacts: this.globals.contacts,
            expenses: this.globals.expenses,
            investments: this.globals.investments,
            confirmation: this.globals.confirmation
        };

        console.log("jsonMessage: ");
        console.log(jsonMessage);

        this.packageJSONMessage();
    }

    //    showRiskDescription(index: number) {
    //        this.globals.showAlert(this.ratings[index - 1].label,
    //            this.ratings[index - 1].description);
    //    }

    isTravelInsuranceValid(): string {
        this.travelInsurancesJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let travelInsurance: any;
        for (travelInsurance in this.travelInsurances) {
            allEmpty = true;
            allFilled = true;
            if (this.travelInsurances[travelInsurance].institution != null
                && this.travelInsurances[travelInsurance].institution != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.travelInsurances[travelInsurance].last_expense_cover != null
                && this.travelInsurances[travelInsurance].last_expense_cover + "" != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.travelInsurances[travelInsurance].pa_cover != null
                && this.travelInsurances[travelInsurance].pa_cover + "" != "")
                allEmpty = false;
            else
                allFilled = false;
            if (this.travelInsurances[travelInsurance].critical_illness_cover != null
                && this.travelInsurances[travelInsurance].critical_illness_cover + "" != "")
                allEmpty = false;
            else
                allFilled = false;

            if (allFilled) { // all fields are valid, include child
                this.travelInsurancesJSON.push(this.travelInsurances[travelInsurance]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }

    isIndemnityInsuranceValid(): string {
        this.indemnityInsurancesJSON = [];

        let allEmpty = true;
        let allFilled = true;
        let indemnityInsurance: any;
        for (indemnityInsurance in this.indemnityInsurances) {
            allEmpty = true;
            allFilled = true;
            if (this.indemnityInsurances[indemnityInsurance].institution != null
                && this.indemnityInsurances[indemnityInsurance].institution != "")
                allEmpty = false;
            else
                allFilled = false;

            if (allFilled) { // all fields are valid, include child
                this.indemnityInsurancesJSON.push(this.indemnityInsurances[indemnityInsurance]);
            } else if (allEmpty) { // all fields not filled, ignore entry
            } else { // partially filled, show notification
                return "Details are not complete!";
            }
        }
    }



    packageJSONMessage(): any {
        

        let json: any = {};

        json.maritalStatus = this.globals.principleDetails.marital_status;

        json.parents = [];
        json.parents[0] = {}; //principle
        json.parents[0].role = "principle";
        json.parents[0].fullName = {
            "surname": this.globals.principleDetails.surname,
            "first": this.globals.principleDetails.first_name,
            "middle": this.globals.principleDetails.middle_name
        };
        json.parents[0].born = this.globals.principleDetails.dob;
        json.parents[0].occupation = this.globals.principleDetails.occupation;
        json.parents[0].employer = this.globals.principleDetails.employer;
        json.parents[1] = {} // spouse
        json.parents[1].role = "spouse";
        json.parents[1].fullName = {
            "surname": this.globals.spouseDetails.surname,
            "first": this.globals.spouseDetails.first_name,
            "middle": this.globals.spouseDetails.middle_name
        };
        json.parents[1].born = this.globals.spouseDetails.dob;
        json.parents[1].occupation = this.globals.spouseDetails.occupation;
        json.parents[1].employer = this.globals.spouseDetails.employer;

        json.dependants = [];
        for (let child in this.globals.childrenDetails) {
            json.dependants[child] = {}; // child
            json.dependants[child].fullName = this.globals.childrenDetails[child].name;
            json.dependants[child].born = this.globals.childrenDetails[child].dob;
            json.dependants[child].estimatedSchoolFees = {
                "primary": this.globals.childrenDetails[child].fee_balance_pri,
                "secondary": this.globals.childrenDetails[child].fee_balance_sec,
                "university": this.globals.childrenDetails[child].fee_balance_uni
            };
        }

        json.expense = [];
        json.expense[0] = {
            "expense": "Rent",
            "amount": this.globals.expenses.monthlyExpenses.rent
        };
        json.expense[1] = {
            "expense": "Utility Bills",
            "amount": this.globals.expenses.monthlyExpenses.utilities
        };
        json.expense[2] = {
            "expense": "Food",
            "amount": this.globals.expenses.monthlyExpenses.food
        };
        json.expense[3] = {
            "expense": "Clothing",
            "amount": this.globals.expenses.monthlyExpenses.clothing
        };
        json.expense[4] = {
            "expense": "Transport/Fuel",
            "amount": this.globals.expenses.monthlyExpenses.transport
        };
        json.expense[5] = {
            "expense": "Entertainment",
            "amount": this.globals.expenses.monthlyExpenses.entertainment
        };
        json.expense[6] = {
            "expense": "Other",
            "amount": this.globals.expenses.monthlyExpenses.others
        };

        json.loans = [];
        for (let index in this.globals.expenses.loanExpenses) {
            json.loans[index] = {};
            json.loans[index].details = [];
            if (this.globals.expenses.loanExpenses[index].type == "--mortgage--") {
                json.loans[index].details[0] = {};
                json.loans[index].details[0].key = "Mortgage";
                json.loans[index].details[1] = {
                    "key": "Description",
                    "value": this.globals.expenses.loanExpenses[index].type
                };
            } else {
                json.loans[index].details[0] = {
                    "key": "Description",
                    "value": this.globals.expenses.loanExpenses[index].type
                };
            }
            json.loans[index].lender = this.globals.expenses.loanExpenses[index].institution;
            json.loans[index].repayment = {
                "amount": this.globals.expenses.loanExpenses[index].repaymentAmount,
                "frequency": this.globals.expenses.loanExpenses[index].frequency
            };
            json.loans[index].outstanding = this.globals.expenses.loanExpenses[index].outstanding;
        }

        json.qna = [];
        json.qna[0] = {
            "key": "Travel",
            "answer": this.travelsForLong
        };
        json.qna[1] = {
            "key": "Profession",
            "answer": this.requiresIndemnity
        };
        json.qna[2] = {
            "key": "EstatePlan",
            "answer": this.hasWill
        };
        json.qna[3] = {
            "key": "Financial Planning Priority",
            "answer": this.financialPriority
        };


        json.income = [];
        json.income[0] = {
            "details": ["Salary", "Principle"],
            "amount": {
                "net": this.globals.income.income.principle,
                "frequency": "MO"
            }
        };
        json.income[1] = {
            "details": ["Salary", "Spouse"],
            "amount": {
                "net": this.globals.income.income.spouse,
                "frequency": "MO"
            }
        };

        for (let i in this.globals.income.extra) {
            json.income[i + 2] = {
                "details": this.globals.income.extra[i].source,
                "amount": {
                    "net": this.globals.income.extra[i].amount,
                    "frequency": this.globals.income.extra[i].frequency
                }
            };
        }


        json.provisions = [];
        let index = 0;
        for (let i in this.globals.investments.realEstateAssets) {
            json.provisions[index] = {};
            json.provisions[index].details = [{
                "key": "Asset",
                "value": "Real Estate"
            },
            {
                "key": "Property",
                "value": this.globals.investments.realEstateAssets[i].type
            },
            {
                "key": "Location",
                "value": this.globals.investments.realEstateAssets[i].location
            }];
            json.provisions[index].value = this.globals.investments.realEstateAssets[i].value;
            index++;
        }

        for (let i in this.globals.investments.vehicleAssets) {
            json.provisions[index] = {};
            json.provisions[index].details = [{
                "key": "Asset",
                "value": "Vehicle"
            },
            {
                "key": "Make",
                "value": this.globals.investments.vehicleAssets[i].make
            },
            {
                "key": "Registration",
                "value": this.globals.investments.vehicleAssets[i].registration
            }];
            json.provisions[index].value = this.globals.investments.vehicleAssets[i].value;
            index++;
        }



        for (let i in this.globals.investments.otherAssets) {
            json.provisions[index] = {};
            json.provisions[index].details = [{
                "key": "Asset",
                "value": this.globals.investments.otherAssets[i].name
            }];
            json.provisions[index].value = this.globals.investments.otherAssets[i].value;
            index++;
        }

        for (let i in this.globals.investments.bankAccounts) {
            json.provisions[index] = {};
            json.provisions[index].details = [{
                "key": "Bank Account",
                "value": this.globals.investments.bankAccounts[i].institution
            },
            {
                "key": "Account",
                "value": this.globals.investments.bankAccounts[i].type
            }];
            json.provisions[index].value = this.globals.investments.bankAccounts[i].value;
            index++;
        }

        for (let i in this.globals.investments.unitTrusts) {
            json.provisions[index] = {};
            json.provisions[index].details = [{
                "key": "Unit Trusts & Mutual Funds",
                "value": this.globals.investments.unitTrusts[i].institution
            },
            {
                "key": "Fund",
                "value": this.globals.investments.unitTrusts[i].type
            }];
            json.provisions[index].contributions = this.globals.investments.unitTrusts[i].contribution;
            json.provisions[index].value = this.globals.investments.unitTrusts[i].value;
            index++;
        }

        for (let i in this.globals.investments.retirementSavings) {
            json.provisions[index] = {};
            json.provisions[index].details = [{
                "key": "Retirement Savings",
                "value": this.globals.investments.retirementSavings[i].institution
            },
            {
                "key": "Scheme",
                "value": this.globals.investments.retirementSavings[i].type
            }];
            json.provisions[index].contributions = this.globals.investments.retirementSavings[i].contribution;
            json.provisions[index].value = this.globals.investments.retirementSavings[i].value;
            index++;
        }

        for (let i in this.globals.investments.regularSavings) {

            json.provisions[index] = {};
            json.provisions[index].details = [];

            if (this.globals.investments.regularSavings[i].type.indexOf("SACCO") >= 0) {
                json.provisions[index].details[0] = {
                    "key": "Financial Investment",
                    "value": "Shares"
                };
                json.provisions[index].details[1] = {
                    "key": "Company",
                    "value": this.globals.investments.regularSavings[i].institution
                };
            } else if (this.globals.investments.regularSavings[i].type.indexOf("SHARES") >= 0) {
                json.provisions[index].details[0] = {
                    "key": "Financial Investment",
                    "value": "SACOO"
                };
                json.provisions[index].details[1] = {
                    "key": "Name",
                    "value": this.globals.investments.regularSavings[i].name
                };
            }
            if (this.globals.investments.regularSavings[i].type.indexOf("_REG") >= 0) {
                json.provisions[index].details[2] = {
                    "key": "Regular"
                };
            }

            if (this.globals.investments.regularSavings[i].type.indexOf("OTHER") >= 0) {
                json.provisions[index].details[0] = {
                    "key": "Financial Investment",
                    "value": this.globals.investments.regularSavings[i].name
                };
                json.provisions[index].details[1] = {
                    "key": "Provider",
                    "value": this.globals.investments.regularSavings[i].provider
                };

                json.provisions[index].netReturns = [{
                    "key": "Sum Assured",
                    "value": this.globals.investments.regularSavings[i].sum_assured
                },
                {
                    "key": "PA",
                    "value": this.globals.investments.regularSavings[i].pa_cover
                },
                {
                    "key": "Critical Illness",
                    "value": this.globals.investments.regularSavings[i].critical_illness_cover
                },
                {
                    "key": "Last Expense",
                    "value": this.globals.investments.regularSavings[i].last_expense_cover
                }];
            }

            json.provisions[index].contributions = this.globals.investments.regularSavings[i].contribution;
            json.provisions[index].value = this.globals.investments.regularSavings[i].value;
            index++;
        }



        for (let i in this.globals.investments.employeeBenefits) {

            json.provisions[index] = {};
            json.provisions[index].details = [];
            json.provisions[index].details[0] = {
                "key": "Personal Insurance",
                "value": ""
            };
            json.provisions[index].details[1] = {
                "key": "Insurer",
                "value": this.globals.investments.employeeBenefits[i].institution
            };
            if (this.globals.investments.employeeBenefits[i].type.indexOf("LFC") >= 0) {
                json.provisions[index].details[0].value = "Life";
                json.provisions[index].contributions = this.globals.investments.employeeBenefits[i].contribution;
                json.provisions[index].value = this.globals.investments.employeeBenefits[i].value;
            } else if (this.globals.investments.employeeBenefits[i].type.indexOf("H") >= 0) {
                json.provisions[index].details[0].value = "Health";
            } else if (this.globals.investments.employeeBenefits[i].type.indexOf("PAC") >= 0) {
                json.provisions[index].details[0].value = "Personal Accident";
            } else if (this.globals.investments.employeeBenefits[i].type.indexOf("D") >= 0) {
                json.provisions[index].details[0].value = "Domestic";
            }
            if (this.globals.investments.employeeBenefits[i].type.indexOf("LFC") >= 0 ||
                this.globals.investments.employeeBenefits[i].type.indexOf("H") >= 0) {
                json.provisions[index].netReturns = [{
                    "key": "Sum Assured",
                    "value": this.globals.investments.employeeBenefits[i].sum_assured
                },
                {
                    "key": "PA",
                    "value": this.globals.investments.employeeBenefits[i].pa_cover
                },
                {
                    "key": "Critical Illness",
                    "value": this.globals.investments.employeeBenefits[i].critical_illness_cover
                },
                {
                    "key": "Last Expense",
                    "value": this.globals.investments.employeeBenefits[i].last_expense_cover
                }];
            }

            if (this.globals.investments.employeeBenefits[i].type.indexOf("PAC") >= 0) {
                json.provisions[index].netReturns = [{
                    "key": "Sum Assured",
                    "value": this.globals.investments.employeeBenefits[i].sum_assured
                },
                {
                    "key": "Critical Illness",
                    "value": this.globals.investments.employeeBenefits[i].critical_illness_cover
                },
                {
                    "key": "Last Expense",
                    "value": this.globals.investments.employeeBenefits[i].last_expense_cover
                }];
            }

            index++;
        }



        for (let i in this.globals.investments.groupEmployeeBenefits) {
            json.provisions[index] = {};
            json.provisions[index].details = [{
                "key": "Employee Benefits",
                "value": this.globals.investments.groupEmployeeBenefits[i].type
            },
            {
                "key": "Insurer",
                "value": this.globals.investments.groupEmployeeBenefits[i].institution
            }];


            json.provisions[index].netReturns = [{
                "key": "Sum Assured",
                "value": this.globals.investments.groupEmployeeBenefits[i].sum_assured
            },
            {
                "key": "PA",
                "value": this.globals.investments.groupEmployeeBenefits[i].pa_cover
            },
            {
                "key": "Critical Illness",
                "value": this.globals.investments.groupEmployeeBenefits[i].critical_illness_cover
            },
            {
                "key": "Last Expense",
                "value": this.globals.investments.groupEmployeeBenefits[i].last_expense_cover
            }];

            index++;
        }

        if (!this.hasWill)
            this.lastWillUpdateDate = null; 

        json.provisions[index] = {
            "details": [{
                "key": "Estate Plan"
            }],
            "dated": this.lastWillUpdateDate
        };
        
        json.contacts = this.globals.contacts;

        console.log("JSON:");
        console.log(json);
    
}
}
    



