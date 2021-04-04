import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { restaurant } from './models/restaurant';
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  apiUrl = 'http://localhost/res/res.php';
  apiUrl2 = 'https://http://localhost/res/resdetail.php';

  constructor(private http: HttpClient) { }

 getrestaurant(): Observable<restaurant[]>{
   return this.http.get<restaurant[]>(this.apiUrl);
 }

 getrestaurantdetail2(id: number): Observable<any[]> {
  // get_course_detail.php?course_id=1
  const param = { 'restaurant_id': id.toString() };
  return this.http.get<any[]>(this.apiUrl2, { params: param });
  }

 }
