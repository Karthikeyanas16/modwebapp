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
  msgStatus = { status: false, type: true, message: '', popup: false };
  courseList: any = [];
  searchSub: Subscription;
  isLoggedIn: any;
  search: string;
  private sub: any;
  displayEnroll: boolean;
  // tslint:disable-next-line:max-line-length
  courseEnroll: any = { id: '', user_id: '', technology_id: '', technology: '', name: '', description: '', comments: '', fees: '', proposalAmount: '', proposalStatus: 'Not Started', mentorId: '' };
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

  enroll(course: any) {
    //   console.log(course)
    this.msgStatus.status = false;
    this.msgStatus.message = '';
    this.msgStatus.popup = true;
    if (this.authService.getIsAuth()) {
      this.displayEnroll = true;
      // tslint:disable-next-line:max-line-length
      this.courseEnroll = { user_id: this.authService.getAuthUser().id, technology: course.technology, fees: course.fees, description: course.description, name: course.name, technology_id: course.technology_id, comments: '', proposalAmount: course.fees, proposalStatus: 'Not Started', mentorId: course.mentor_id };
    } else {
      this.displayEnroll = false;
    }
  }
  sendProposal() {
    if (this.authService.getAuthUser().id && this.courseEnroll.technology_id && this.courseEnroll.proposalAmount) {
      const reqBody: any = {
        user_id: this.authService.getAuthUser().id,
        technology_id: this.courseEnroll.technology_id,
        comments: this.courseEnroll.comments,
        proposalAmount: this.courseEnroll.proposalAmount,
        proposalStatus: 'Not Started',
        mentor_id: this.courseEnroll.mentorId
      };
      this.courseService.courseEnroll(reqBody).subscribe(res => {
        // console.log(res);
        this.msgStatus.status = true;
        this.msgStatus.popup = false;
        this.msgStatus.message = 'Proposal sent successfully.';
        this.displayEnroll = false;
        this.getCourseList();
        // tslint:disable-next-line:max-line-length
        this.courseEnroll = { id: '', user_id: '', technology_id: '', technology: '', name: '', description: '', comments: '', fees: '', proposalAmount: '', proposalStatus: 'Not Started' };
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
      });
    }
  }
  onClose() {
    // tslint:disable-next-line:max-line-length
    this.courseEnroll = { id: '', user_id: '', technology_id: '', technology: '', name: '', description: '', comments: '', fees: '', proposalAmount: '', proposalStatus: 'Not Started', mentorId: '' };
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
