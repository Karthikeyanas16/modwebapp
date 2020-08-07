import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mentor-menu',
  templateUrl: './mentor-menu.component.html',
  styleUrls: ['./mentor-menu.component.css']
})
export class MentorMenuComponent implements OnInit {
  auth: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.getAuthUser()) {
      this.auth = this.authService.getAuthUser();
    }
  }

}
