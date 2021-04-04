import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(private navCtrl: NavController, private route: ActivatedRoute) { }



  ngOnInit() {
  }

  gohome() {
    this.navCtrl.navigateForward('/home');


}
 }
