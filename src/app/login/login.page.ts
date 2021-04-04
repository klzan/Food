import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import {LoadingController,AlertController,NavController,} from '@ionic/angular';
import { FeedBack } from '../models/feedback';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  feedback: FeedBack;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private LoginService: LoginService,
    private navCtrl: NavController
  ) {}
  ngOnInit() {
    // เช็คเคยล็อกอินไหม
    const status = localStorage.getItem('login');
    if (status == '1') {
      this.navCtrl.navigateRoot('/home');
    }
  }
  async login(form: any) {

    const email = form.email;
    const password = form.password;

    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังบันทึกข้อมูล ํ ...',
    });
    await loading.present();

    this.LoginService.login(email, password).subscribe(
      async (feedback: FeedBack) => {
        this.feedback = feedback;
        if (this.feedback.status === 'ok') {

          const alert = await this.alertCtrl.create({
            message: this.feedback.message,
            buttons: ['ตกลง'],
          });

          await alert.present();

          localStorage.setItem('login', '1');
          localStorage.setItem('name', `${email}`);


          this.navCtrl.navigateRoot('/home');
        } else {

          const alert = await this.alertCtrl.create({
            message: this.feedback.message,
            buttons: ['ตกลง'],
          });

          await alert.present();
        }
      },
      async (error) => {
        console.log(error);
        await loading.dismiss();
      },
      async () => {
        await loading.dismiss();
      }
    );
  }

  signup() {
    this.navCtrl.navigateRoot('/signup');
  }


}
