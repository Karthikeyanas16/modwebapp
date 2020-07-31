import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  technologies :any = [];
  selectedUsers:any
  loading : boolean;
  displayModal:boolean;
  selectedStatus :boolean;
  userStatus : any = [{'label' : 'Active' , value : true},{'label' : 'Inactive' , value : false}];
   constructor() { }
 
   ngOnInit(): void {
     this.technologies.push(
       {'id':1,'technology':'AI','description':'this is test description', 'domain':'Development','status': true},
       {'id':2,'technology':'Web Development','domain':'Business','description':'this is test description','status': true},
       {'id':3,'technology':'Robotics','domain':'Data Science','description':'this is test description','status': true},
       {'id':4,'technology':'Space Research','domain':'Mobile App','description':'this is test description','status': true},
       {'id':5,'technology':'Health Secience','domain':'Programming Languages','description':'this is test description','status': true},
     );
   }
 
   onClick(row:any){
     this.displayModal =true;
   }

}
