import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-view-proposals',
  templateUrl: './view-proposals.component.html',
  styleUrls: ['./view-proposals.component.css']
})
export class ViewProposalsComponent implements OnInit {


  proposals: any = [];
  selectedProposals: any;
  loading: boolean;
  displayModal: boolean;
  selectedStatus: boolean;
  msgStatus = { status: false, type: true, message: '', popup: false };
  proposal: any = { id: '',comments: '', proposalAmount: '',proposalStatus:'',username:'',technology:'', mentorname:'' };
  displayDelete: boolean;
  selectedRowId: any;
  ngOnInit(): void {
    this.getProposals();
  }

  constructor(private adminService: AdminService) { }
  getProposals() {
    this.adminService.getProposals().subscribe(res => {
      this.proposals = res;
    }, error => {
      console.log('error', error);
      let msg = 'Oops !! Something went wrong, please contact the System Administrator';
      if (error.error.message) {
        msg = error.error.message;
      }
      this.msgStatus.status = true;
      this.msgStatus.message = msg;
      this.msgStatus.type = false;
    });
  }

}
