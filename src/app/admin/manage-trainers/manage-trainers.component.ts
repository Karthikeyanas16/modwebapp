import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-trainers',
  templateUrl: './manage-trainers.component.html',
  styleUrls: ['./manage-trainers.component.css']
})
export class ManageTrainersComponent implements OnInit {

  users :any = [];
  selectedUsers:any
  loading : boolean;
  displayModal:boolean;
  selectedStatus :boolean;
  userStatus : any = [{'label' : 'Active' , value : true},{'label' : 'Inactive' , value : false}];
   constructor() { }
 
   ngOnInit(): void {
     this.users.push({'id':1,'name':'DJ','email':'dsjadhav92@gmail.com','mobile':'8600256227','status': true},
     {'id':2,'name':'Swapnil','email':'swapnilgmail.com','mobile':'9220772661','status':true},
     {'id':3,'name':'Sandip Wafare','email':'sandipw2@gmail.com','mobile':'9657265481','status':false},
     {'id':4,'name':'Rohini Jadhav','email':'Rohini@gmail.com','mobile':'9220772668','status':true},
     {'id':5,'name':'Amit Thorat','email':'amit@gmail.com','mobile':'9657276489','status':true},
     );
   }
 
   onClick(row:any){
     this.displayModal =true;
   }

}
