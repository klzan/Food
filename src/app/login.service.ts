import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedBack } from './models/feedback';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl = 'http://127.0.0.1/FoodAPI/login.php';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };

    const body = {
      'email': email,
      'password': password,
    };

    return this.http.post<FeedBack>(this.apiUrl, body, { headers: header });
  }
}
