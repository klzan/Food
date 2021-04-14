import { Component, OnInit,  } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],

})
export class ReviewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  rate=0;
  onRate(rate) {
      console.log(rate)
      this.rate = rate;
    }


}
