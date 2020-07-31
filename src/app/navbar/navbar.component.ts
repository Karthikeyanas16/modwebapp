import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  display: boolean;
  authStatSubs: Subscription;
  isLoggedIn: boolean;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsAuth();
    this.authStatSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
    console.log(this.isLoggedIn);
    // this.isLoggedIn = true;
    // this.authService.userType = 'mentor';
  }
  doLogout() {
    this.authService.logout();
  }
}
