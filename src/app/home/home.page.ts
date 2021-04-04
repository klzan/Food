import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email:string;
  password:string;
  postService: any;


  constructor(private navCtrl: NavController ,private route: ActivatedRoute) {}

  ngOnInit() {
  }
  goTohome() {
    this.navCtrl.navigateForward('/home');
  }

  goToprofile() {
    this.navCtrl.navigateForward('/profile');
  }

  goTomap() {
    this.navCtrl.navigateForward('/map');
  }
  goToMessang() {
    this.navCtrl.navigateForward('/message');
  }

  goToonclick() {
    this.navCtrl.navigateForward('/onclick');
  }
  search() {
    let text = (<HTMLInputElement>document.getElementById("searchtext")).value;
    console.log('text :>> ', text);
  }





}


