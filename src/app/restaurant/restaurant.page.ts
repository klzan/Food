import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestaurantService } from '../Restaurant.Service';
import { restaurant } from '../models/restaurant';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit, OnDestroy {
  restaurants: restaurant[];
  sub: Subscription;
  NavCtrl: any;

  constructor(
    private navCtrl: NavController,
    private RestaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.sub = this.RestaurantService.getrestaurant().subscribe(
      (restaurants) => {
        this.restaurants = restaurants;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  itemSelected(c: restaurant) {
    this.navCtrl.navigateForward([
      '/detail2',
      {
        id: c.name,
        title: c.name,
      },
    ]);
  }
}
