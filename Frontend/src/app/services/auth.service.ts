import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  regUser(user) {
    return this.http.post<any>(this.backUrl + '/register', user);
  }

  logInUser(user) {
    return this.http.post<any>(this.backUrl + '/login', user);
  }

  logged() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
