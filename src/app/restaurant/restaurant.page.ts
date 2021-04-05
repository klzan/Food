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
  searchQuery: string = '';
  items: string[];

  constructor(
    private navCtrl: NavController,
    private RestaurantService: RestaurantService

  ) { this.initializeItems(RestaurantService);}



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
//ค้นหาร้านอาหาร
  initializeItems(RestaurantService) {
    this.items = [
      'klong1',
      'klong2',

    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems(RestaurantService);

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}


