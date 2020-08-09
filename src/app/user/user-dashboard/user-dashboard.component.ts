import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  msgStatus = { status: false, type: true, message: '' };
  courseList: any = [];
  searchSub: Subscription;
  isLoggedIn: any;
  search: string;
  private sub: any;
  constructor(private courseService: CourseService, private authService: AuthService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.routes.params.subscribe(params => {
      this.search = params['search'];
      this.search === 'list' ? this.getCourseList() : this.getCoursesByStatus();
    });
    this.isLoggedIn = this.authService.getIsAuth();
    this.searchSub = this.courseService.courses.subscribe((value) => {
      this.courseList = value;
    });
  }


  getCourseList() {
    this.courseService.getUserCourses().subscribe(res => {
      // console.log('res', res);
      this.courseList = res;
      this.msgStatus.message = '';
      this.msgStatus.status = false;
      if (!this.courseList.length) {
        this.msgStatus.status = true;
        this.msgStatus.message = 'Not record found !';
        this.msgStatus.type = false;
      }
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
  getCoursesByStatus() {
    this.courseService.getCoursesByStatus(this.search).subscribe(res => {
      console.log('res', res);
      this.courseList = res;
      this.msgStatus.message = '';
      this.msgStatus.status = false;
      if (!this.courseList.length) {
        this.msgStatus.status = true;
        this.msgStatus.message = 'Not record found !';
        this.msgStatus.type = false;
      }
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
  goToDashboard() {
    this.authService.navigateUser();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
