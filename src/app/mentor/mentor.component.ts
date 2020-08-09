import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {
  isLoggedIn: any;

  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsAuth();
    this.route.navigate(['mentor/dashboard', 'list']);
  }
  goToDashboard() {
    this.authService.navigateUser();
  }
}
