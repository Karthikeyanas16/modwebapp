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
  msgStatus = { status: false, type: true, message: '', popup: false };
  displayDelete: boolean;
  selectedRowId: any;
  technology: any = { id: '', technology: '', description: '', status: '', fees: '' };
  label = '';
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getTechnology();
  }

  onEdit(row: any) {
    console.log(row);
    this.msgStatus.status = false;
    this.displayModal = true;
    this.msgStatus.message = "";
    this.label = 'Add';
    this.technology = { id: '', technology: '', description: '', status: 'Not Started', fees: '0' };
    if (row) {
      this.label = 'Edit';
      this.technology.id = row.id;
      this.technology.technology = row.technology;
      this.technology.description = row.description;
      this.technology.status = row.status;
      this.technology.fees = row.fees;
    }
  }
  onDelete(id: any) {
    this.msgStatus.message = "";
    this.displayDelete = true;
    this.msgStatus.status = false;
    this.msgStatus.message = '';
    this.msgStatus.popup = false;
    this.selectedRowId = id;
  }
  delete() {
    this.adminService.deleteTechnology(this.selectedRowId).subscribe(res => {
      const msg = 'Technology deleted successfully!';
      this.displayDelete = false;
      this.msgStatus.status = true;
      this.msgStatus.message = msg;
      this.msgStatus.type = true;
      this.msgStatus.popup = true;
      this.getTechnology();
    }, error => {
      console.log('error', error);
      let msg = 'Oops !! Something went wrong, please contact the administrator';
      if (error.error.message) {
        msg = error.error.message;
      }
      this.msgStatus.status = true;
      this.msgStatus.message = msg;
      this.msgStatus.type = false;
      this.msgStatus.popup = true;
      this.displayDelete = false;
    });
    setTimeout(() => {
      this.msgStatus.status = false;
    }, 3000);
  }
  cancel() {
    this.displayDelete = false;
  }
  getTechnology() {
    this.adminService.getTechnology().subscribe(res => {
      this.technologies = res;
    }, error => {
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
    if (this.technology.technology !== '' && this.technology.description !== '' && this.technology.status !== '' && this.technology.fees !== '') {
      this.adminService.updateTechnology(this.technology).subscribe(res => {
        this.msgStatus.status = true;
        this.msgStatus.message = 'Technology updated successfully!';
        this.msgStatus.type = true;
        this.msgStatus.popup = true;
        this.displayModal = false;
        this.getTechnology();
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
      this.msgStatus.status = false;
    }, 3000);
  }
}
