import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-domains',
  templateUrl: './manage-domains.component.html',
  styleUrls: ['./manage-domains.component.css']
})
export class ManageDomainsComponent implements OnInit {

  
  domains :any = [];
  selectedUsers:any
  loading : boolean;
  displayModal:boolean;
  selectedStatus :boolean;
  userStatus : any = [{'label' : 'Active' , value : true},{'label' : 'Inactive' , value : false}];
   constructor() { }
 
   ngOnInit(): void {
     this.domains.push(
       {'id':1,'domain':'Development','description':'this is test description','status': true},
       {'id':2,'domain':'Business','description':'this is test description','status': true},
       {'id':3,'domain':'Data Science','description':'this is test description','status': true},
       {'id':4,'domain':'Mobile App','description':'this is test description','status': true},
       {'id':5,'domain':'Programming Languages','description':'this is test description','status': true},
     );
   }
 
   onClick(row:any){
     this.displayModal =true;
   }

}
