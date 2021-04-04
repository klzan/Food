import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FeedBack } from '../models/feedback';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  feedback: FeedBack;
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}
  ngOnInit() {}
  async signup(form: any) {
    const fullname = form.fullname;
    const email = form.email;
    const password = form.password;

    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังบันทึกข้อมูล ํ ...',
    });
    await loading.present();

    this.authService.signup(fullname, email, password).subscribe(
      async (feedback: FeedBack) => {
        this.feedback = feedback;
        if (this.feedback.status === 'ok') {
          const alert = await this.alertCtrl.create({
            message: this.feedback.message,
            buttons: ['ตกลง'],
          });

          await alert.present();

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
}
