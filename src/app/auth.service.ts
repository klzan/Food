import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedBack } from './models/feedback';
@Injectable({
 providedIn: 'root'
})
export class AuthService {

 apiUrl = 'http://127.0.0.1/FoodAPI/signup.php';
 constructor(private http: HttpClient) {}

 signup(fullname: string, email: string, password: string):
 Observable<FeedBack> {
  const header = { 'Content-Type': 'application/json' };

  const body = {
    'fullname': fullname,
    'email': email,
    'password': password
    };

 return this.http.post<FeedBack>(this.apiUrl, body, { headers: header
 });
  }
 }
