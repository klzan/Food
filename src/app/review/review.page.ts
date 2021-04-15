import { Component, OnInit,  } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LoadingController,AlertController,NavController,} from '@ionic/angular';
@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],

})
export class ReviewPage implements OnInit {

  constructor(private navCtrl: NavController,private alertCtrl: AlertController,) { }

  ngOnInit() {


  }

  rate=0;
  onRate(rate) {
      console.log(rate)
      this.rate = rate;
    }

    async login(){
      const status = localStorage.getItem('login');
    if (status == '1') {
      this.navCtrl.navigateRoot('/review');
      this.fake();
    }
    else {
      this.navCtrl.navigateRoot('/login');

      const alert = await this.alertCtrl.create({

        message: "เข้าสู่ระบบก่อนไอ้สัด",
        buttons: ['ตกลง'],
      });
      await alert.present();
    }
    // const alert = await this.alertCtrl.create({
    //   message: "บันทึกข้อมูลเรียบร้อย",
    //   buttons: ['ตกลง'],
    // });
    // await alert.present();
    // this.navCtrl.navigateForward('/home');

    }
    async fake(){
  localStorage.setItem('review', '1');
  const status = localStorage.getItem('review');
    if (status == '1') {
      this.navCtrl.navigateRoot('/home');
      const alert = await this.alertCtrl.create({
        message: "บันทึกสำเร็จ",
        buttons: ['ตกลง'],
      });
      await alert.present();
    } else {

    }
}


}
