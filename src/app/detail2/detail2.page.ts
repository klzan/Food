import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { restaurant } from '../models/restaurant';

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.page.html',
  styleUrls: ['./detail2.page.scss'],
})
export class Detail2Page implements OnInit {
  id: number;
  title: string;
  details: any[];
  restaurantservice: any;
  restaurants: any;
  http: any;
  baseURI: string;
  item: string;
  location: string;
  map: string;

  constructor(private route: ActivatedRoute,private RestaurantService: RestaurantService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.title = this.route.snapshot.paramMap.get('title');
  }

  ngOnInit() {
    this.RestaurantService.getrestaurantdetails(this.id).subscribe(
      (details) => {
        this.details = details;
      }
    );
  }

//   loadData() {
//     var link = this.baseURI + 'http://localhost/res/resdetail.php';

//     this.http
//       .get(link)
//       .map((res) => res.json())
//       .subscribe((data) => {
//         console.log('detail: ', data);
//         this.restaurants = data;
//       });
//   }
//   initializeItems(){
//     this.restaurants = this.restaurants;
// }

// getItem(ev: any){
//     // Reset items back to all of the items
//     this.initializeItems();

// }
}
