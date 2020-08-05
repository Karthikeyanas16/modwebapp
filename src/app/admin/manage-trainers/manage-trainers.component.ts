import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manage-trainers',
  templateUrl: './manage-trainers.component.html',
  styleUrls: ['./manage-trainers.component.css']
})
export class ManageTrainersComponent implements OnInit {

  users: any = [];
  selectedUsers: any;
  loading: boolean;
  displayModal: boolean;
  selectedStatus: boolean;
  msgStatus = { status: false, type: true, message: '' };
  userStatus: any = [{ label: 'Active', value: true }, { label: 'Inactive', value: false }];
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getMentors();
  }

  onClick(row: any) {
    this.displayModal = true;
  }

  getMentors() {
    this.adminService.getMentors().subscribe(res => {
      this.users = res;
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
