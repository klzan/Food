import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { FeedBack } from '../models/feedback';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  feedback: FeedBack;

  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController) { }

  ngOnInit() {
  }


  Register() {
    this.navCtrl.navigateRoot('/register');
    }

    openSignup() {
      this.navCtrl.navigateForward('/signup');
      }

}
