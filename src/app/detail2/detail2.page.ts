import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.page.html',
  styleUrls: ['./detail2.page.scss'],
})
export class Detail2Page implements OnInit {
  id: number;
  title: string;
  detail2: any[];
  restaurantservice: any;

  constructor(private route: ActivatedRoute, private restaurantService:
    RestaurantService) {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.title = this.route.snapshot.paramMap.get('title');
    }

    ngOnInit() {
      this.restaurantservice.getrestaurantdetail2(this.id).subscribe(
        (detail2) => {
        this.detail2 = detail2;
        }
      );
    }
}

