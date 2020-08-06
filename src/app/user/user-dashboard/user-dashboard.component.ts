import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  msgStatus = { status: false, type: true, message: '' };
  courseList: any = [];
  searchSub: Subscription;
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getCourseList();
    this.searchSub = this.courseService.courses.subscribe((value) => {
      this.courseList = value;
    });
  }

  getCourseList() {
    this.courseService.geAllCourses().subscribe(res => {
      console.log('res', res);
      this.courseList = res;
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
