import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  msgStatus = { status: false, type: true, message: '' };
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.adminService.welcome().subscribe(res => {
      this.msgStatus.status = true;
      this.msgStatus.message = res;
      this.msgStatus.type = true;
    }
      , error => {
        console.log('error', error);
        let msg = 'Oops !! Something went wrong, please contact the administrator';
        if (error.error.message) {
          msg = error.error.message;
        }
        this.msgStatus.status = true;
        this.msgStatus.message = msg;
        this.msgStatus.type = false;
      });
  }
}
