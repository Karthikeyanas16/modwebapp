import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsAuth();
    this.route.navigate(['user/dashboard', 'list']);
  }
  goToDashboard() {
    this.authService.navigateUser();
  }

}
