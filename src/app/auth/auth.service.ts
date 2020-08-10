import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  userType: string;
  private authStatusListener = new Subject<boolean>();
  token: any;
  tokenTimer: any;

  constructor(private http: HttpClient, private route: Router) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.authStatusListener.next(false);
    this.route.navigate(['/auth/login']);
  }

  getToken() {
    return (localStorage.getItem('token'));
  }


  createUser(reqBody): Observable<any> {
    const url: any = `${environment.userService}/register`;
    return this.http.post(url, reqBody).pipe(
      map(response => {
        return response;
      })
    );
  }
  getTechList(): Observable<any> {
    const url: any = `${environment.searchService}/technology`;
    return this.http.get(url).pipe(
      map(response => {
        return response;
      })
    );
  }

  loginUser(user: User): Observable<any> {
    const headers = new HttpHeaders(
      user ? {
        authorization: 'Basic ' + btoa(user.email + ':' + user.password)
      } : {}
    );
    const url: any = `${environment.authService}/service/user/login`;
    return this.http.get<any>(url, { headers }).pipe(
      map(response => {
        console.log(response);
        if (response['token']) {
          localStorage.setItem('token', JSON.parse(JSON.stringify(response['token'])));
          localStorage.setItem('authUser', JSON.stringify(response));
          this.authStatusListener.next(true);
        }
        return response;
      })
    );
  }
  private setAuthTimer(duration: number) {
    // console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }
  getIsAuth() {
    let loggedIn: boolean;
    if (localStorage.getItem('token')) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
    return loggedIn;
  }
  getAuthUser() {
    return JSON.parse(localStorage.getItem('authUser'));
  }
  navigateUser() {
    if (this.getAuthUser().role === 'admin') {
      this.route.navigate(['/admin']);
    } else if (this.getAuthUser().role === 'mentor') {
      this.route.navigate(['/mentor']);
    } else if (this.getAuthUser().role === 'user') {
      this.route.navigate(['/user']);
    }
  }
}
export class User {
  email: string;
  password: string;
}
