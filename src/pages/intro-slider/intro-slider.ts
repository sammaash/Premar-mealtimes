import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {AlertService} from '../../providers/alert-service/alert-service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the IntroSliderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
    selector: 'page-intro-slider',
    templateUrl: 'intro-slider.html',
})
export class IntroSliderPage {
    @ViewChild(Slides) slides: Slides;

    isSkipped = true;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private storage: Storage,
        private alertService: AlertService) {
        this.alertService.confirmExitApp(navCtrl);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IntroSliderPage');
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter IntroSliderPage');
        this.isFirstLaunch();
    }
    
    startSurvey() {
        this.navCtrl.setRoot(TabsPage);
    }
    
    skipShow() {
        this.isSkipped = true;
        this.setFirstLaunch();
    }

    slideChanged() {
        if (this.slides.isEnd()) {
            this.skipShow();
        }
    }

    nextSlide() {
        this.slides.slideNext();
    }

    isFirstLaunch() {
        this.storage.get('first_launch').then((val) => {
            console.log('First launch value: ', val);
            if (val === '0') {
                //this.skipShow();
            } else {
                this.isSkipped = false;
            }
        });
    }

    setFirstLaunch() {
        this.storage.set('first_launch', '0');
    }

    fabButtonClick(action, fab) {
        fab.close();
        switch (action) {
            case 'share':
                this.alertService.showShareScreen();
        }
    }
}