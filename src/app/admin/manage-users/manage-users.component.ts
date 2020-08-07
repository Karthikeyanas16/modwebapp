import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any = [];
  selectedUsers: any;
  loading: boolean;
  displayModal: boolean;
  selectedStatus: boolean;
  msgStatus = { status: false, type: true, message: '' };
  userStatus: any = [{ label: 'Active', value: true }, { label: 'Inactive', value: false }];
  displayDelete: boolean;
  selectedRowId: any;
  user: any = { name: '', email: '', status: '0' };
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  onEdit(row: any) {
    console.log(row)
    this.displayModal = true;
    this.user.name = row.name;
    this.user.status = row.status;
  }
  onDelete(id: any) {
    this.displayDelete = true;
    this.selectedRowId = id;
  }
  delete() {
    this.adminService.deleteUser(this.selectedRowId).subscribe(res => {
      const msg = 'Record deleted successfully!';
      this.displayDelete = false;
      this.msgStatus.status = true;
      this.msgStatus.message = msg;
      this.msgStatus.type = true;
      this.getUsers();
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
    });
  }
  cancel() {
    this.displayDelete = false;
  }
  getUsers() {
    this.adminService.getUsers().subscribe(res => {
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
    //   if (this.form.valid) {
    //     const reqBody = new User(
    //       this.form.value.name,
    //       this.form.value.email,
    //       this.form.value.password,
    //       this.form.value.role,
    //       this.form.value.technology
    //     );
    //     this.adminService.updateUser(reqBody).subscribe(res => {
    //       this.msgStatus.status = true;
    //       this.msgStatus.message = 'User updated successfully!';
    //       this.msgStatus.type = true;
    //     }, error => {
    //       console.log('error', error);
    //       let msg = 'Oops !! Something went wrong, please contact the administrator';
    //       if (error.error.message) {
    //         msg = error.error.message;
    //       }
    //       this.msgStatus.status = true;
    //       this.msgStatus.message = msg;
    //       this.msgStatus.type = false;
    //     });

    //   } else {
    //     this.msgStatus.status = true;
    //     this.msgStatus.message = 'Oops !! Something went wrong, please contact the administrator';
    //     this.msgStatus.type = false;
    //   }
    //   setTimeout(() => {
    //     this.msgStatus.status = false;
    //   }, 5000);
  }
}
