import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    this.route.navigate(['/']);
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
    const url: any = `${environment.searchCourses}/technology`;
    return this.http.get(url).pipe(
      map(response => {
        return response;
      })
    );
  }

  loginUser(reqBody): Observable<any> {
    return this.http
      .post(
        `${environment.userService}/authenticate`,
        reqBody
      )
      .pipe(
        map(response => {
          const token = 'eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0'; // response.token;
          this.token = token;
          if (token) {
            localStorage.setItem('token', JSON.parse(JSON.stringify(token)));
            localStorage.setItem('authUser', JSON.stringify(response));
            // const expiresInDuration = response.data.expiresIn;
            // this.setAuthTimer(expiresInDuration);
            this.authStatusListener.next(true);
            // const now = new Date();
            // const expirationDate = new Date(
            //   now.getTime() + expiresInDuration * 1000
            // );
            // console.log(expirationDate);
            // this.saveAuthData(token, expirationDate);
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
