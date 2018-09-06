import {Injectable} from '@angular/core';
import {AlertController, Alert, NavController, Platform} from 'ionic-angular';
import {SocialSharing} from '@ionic-native/social-sharing';

/*
  Generated class for the AlertService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertService {

    shownConfirm: Alert = null;

    constructor(public alertCtrl: AlertController, private socialSharing: SocialSharing,
        private platform: Platform) {
        console.log('Hello AlertService Provider');
    }

    confirmExitApp(navCtrl: NavController) {
        this.platform.registerBackButtonAction(() => {
            if (!navCtrl.canGoBack()) {
                if (this.shownConfirm == null) {
                    this.shownConfirm = this.showConfirm('Exit App',
                        'Are you sure you want to exit Muvizoo App?', () => {
                            this.shownConfirm = null;
                            this.platform.exitApp(); // exit app
                        }, () => {this.shownConfirm = null;});
                    this.shownConfirm.onWillDismiss(() => {this.shownConfirm = null;});
                } else {
                    this.shownConfirm.dismiss();
                    this.shownConfirm = null;
                }
            } else {
                navCtrl.pop();
            }
        }, 101);
    }

    showAlert(subtitle, message) {
        //        let title = 'Youth Fund App';
        let alert = this.alertCtrl.create({
            //            title: title,
            subTitle: subtitle,
            cssClass: 'alertBox',
            message: message,
            buttons: [

                {
                    cssClass: 'ok-button',
                    text: 'OK',
                    handler: () => {
                    }
                }
            ]
        });
        alert.present();
    }

    showConfirm(subtitle, message, okCallbackFunc?, cancelCallbackFunc?) {
        let confirm = this.alertCtrl.create({
            subTitle: subtitle,
            cssClass: 'confirmBox',
            message: message,
            buttons: [
                {
                    text: 'CANCEL',
                    cssClass: 'cancel-button',
                    handler: () => {
                        cancelCallbackFunc();
                    }
                },
                {
                    text: 'OK',
                    cssClass: 'ok-button',
                    handler: () => {
                        okCallbackFunc();
                    }
                }
            ]
        });
        confirm.present();
        return confirm;
    }

    popupInputDialog(subtitle, previousReviewPopup: Alert, okCallbackFunc?, cancelCallbackFunc?) {
        let previousReview = "";
        if (previousReviewPopup) {
            previousReview = previousReviewPopup.data.inputs[0].value;
        }
        let popupInput = this.alertCtrl.create({
            subTitle: subtitle,
            cssClass: 'confirmBox',
            inputs: [{
                name: 'review-text', type: 'textarea', placeholder: 'Type your review here...', value: previousReview
            }],
            buttons: [
                {
                    text: 'CANCEL',
                    cssClass: 'cancel-button',
                    handler: () => {
                        cancelCallbackFunc();
                    }
                },
                {
                    text: 'OK',
                    cssClass: 'ok-button',
                    handler: () => {
                        okCallbackFunc();
                    }
                }
            ]
        });
        popupInput.present();
        return popupInput;
    }

    showShareScreen() {
        let message = 'Hi, please download the Muvizoo App to quickly shop for movies, series, TV shows, and other services and enjoy quick home delivery.';
        let subject = 'Welcome to Muvizoo';
        let file = '';
        let url = 'http://muvizoo.co.ke';
        this.socialSharing.share(message, subject, file, url);
    }
}
