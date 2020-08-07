import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  auth: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.getAuthUser()) {
      this.auth = this.authService.getAuthUser();
    }
  }

}
