import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'https://eazyrooms-staging.codeace.us/api/user_registeration';
  private loginUrl = 'https://eazyrooms-staging.codeace.us/api/userlogin';

  constructor(private http: HttpClient  ) { }

  signUp(userData: any): Observable<any> {
    console.log("userData in service",userData)
    return this.http.post<any>(this.registerUrl, userData);
  }

  login(credentials: any): Observable<any> {
    console.log("service",credentials)
    return this.http.post<any>(this.loginUrl, credentials);
  }
}
