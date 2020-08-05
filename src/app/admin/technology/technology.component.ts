import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  technologies: any = [];
  selectedUsers: any;
  loading: boolean;
  displayModal: boolean;
  selectedStatus: boolean;
  msgStatus = { status: false, type: true, message: '' };
  userStatus: any = [{ label: 'Active', value: true }, { label: 'Inactive', value: false }];
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getTechnology();
  }

  onClick(row: any) {
    this.displayModal = true;
  }
  getTechnology() {
    this.adminService.getTechnology().subscribe(res => {
      console.log('res', res);
      this.technologies = res;
    }, error => {
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
