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
  msgStatus = { status: false, type: true, message: '', popup: false };
  displayDelete: boolean;
  selectedRowId: any;
  user: any = { id: '', name: '', email: '', status: '0', role: '', technology_id: '' };
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getMentors();
  }
  onEdit(row: any) {
    this.msgStatus.status = false;
    this.displayModal = true;
    this.msgStatus.message = "";
    if (row) {
      const status: string = row.status === 0 ? '0' : '1';
      this.user.id = row.id;
      this.user.name = row.name;
      this.user.email = row.email;
      this.user.status = status;
      this.user.role = row.role;
      this.user.technology_id = row.technology_id;
    }
  }
  onDelete(id: any) {
    this.msgStatus.message = "";
    this.displayDelete = true;
    this.selectedRowId = id;
    this.msgStatus.status = false;
    this.msgStatus.message = '';
    this.msgStatus.popup = false;
  }
  delete() {
    this.msgStatus.status = false;
    this.msgStatus.message = '';
    this.msgStatus.popup = false;
    this.adminService.deleteUser(this.selectedRowId).subscribe(res => {
      const msg = 'Mentor deleted successfully!';
      this.displayDelete = false;
      this.msgStatus.status = true;
      this.msgStatus.message = msg;
      this.msgStatus.type = true;
      this.msgStatus.popup = true;
      this.getMentors();
    }, error => {
      console.log('error', error);
      let msg = 'Oops !! Something went wrong, please contact the administrator';
      if (error.error.message) {
        msg = error.error.message;
      }
      this.msgStatus.status = true;
      this.msgStatus.message = msg;
      this.msgStatus.type = false;
      this.displayDelete = false;
      this.msgStatus.popup = true;
    });
  }
  cancel() {
    this.displayDelete = false;
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

  update() {
    if (this.user.name !== '' && this.user.email !== '' && this.user.status !== '' && this.user.role !== '' && this.user.technology_id !== '') {
      this.adminService.updateUser(this.user).subscribe(res => {
        this.msgStatus.status = true;
        this.msgStatus.message = 'Mentor updated successfully!';
        this.msgStatus.type = true;
        this.msgStatus.popup = true;
        this.displayModal = false;
        this.getMentors();
      }, error => {
        let msg = 'Oops !! Something went wrong, please contact the administrator';
        if (error.error.message) {
          msg = error.error.message;
        }
        this.msgStatus.status = true;
        this.msgStatus.message = msg;
        this.msgStatus.type = false;
        this.msgStatus.popup = true;
      });

    } else {
      this.msgStatus.status = true;
      this.msgStatus.message = 'All fields are mandatory!';
      this.msgStatus.type = false;
      this.msgStatus.popup = true;
    }
    setTimeout(() => {
    //  this.msgStatus.status = false;
    }, 3000);
  }

}
