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
  baseURI: string;
  http: any;


  constructor(
    private navCtrl: NavController,
    private RestaurantService: RestaurantService

  ) { this.initializeItems;
      // this.items = NavParams.RestaurantService.item;
  }

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
    this.navCtrl.navigateForward(['/detail2',{
        id: c.name,
        title: c.name,
      },
    ]);
  }
//ค้นหาร้านอาหาร
loadData()
{
    var link = this.baseURI + "http://localhost/res/res.php";

    this.http.get(link)
    .map(res => res.json())
    .subscribe(data =>
    {
        console.log("restaurants: ", data);
        this.restaurants = data;
    });
}

initializeItems(){
    this.restaurants = this.restaurants;
}

getItem(ev: any){
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.restaurants = this.restaurants.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
}
}


