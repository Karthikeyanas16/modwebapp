import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CourseService } from '../course.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msgStatus = { status: false, type: true, message: '', popup: false };
  courseList: any = [];
  searchSub: Subscription;
  displayAlert: boolean;
  isLoggedIn: boolean;
  displayEnroll: boolean;
  // tslint:disable-next-line:max-line-length
  courseEnroll: any = { id: '', user_id: '', technology_id: '', technology: '', name: '', description: '', comments: '', fees: '', proposalAmount: '', proposalStatus: 'Not Started' };
  constructor(private courseService: CourseService, public el: ElementRef, private authService: AuthService, private route: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsAuth();
    this.getCourseList();
    this.searchSub = this.courseService.courses.subscribe((value) => {
      this.courseList = value;
    });
  }

  getCourseList() {
    this.courseService.geAllCourses().subscribe(res => {
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
  enroll(course: any) {
    this.msgStatus.status = false;
    this.msgStatus.message = '';
    this.msgStatus.popup = true;
    if (this.authService.getIsAuth()) {
      this.displayAlert = false;
      this.displayEnroll = true;
      // tslint:disable-next-line:max-line-length
      this.courseEnroll = { user_id: this.authService.getAuthUser().id, technology: course.technology, fees: course.fees, description: course.description, name: course.name, technology_id: course.id, comments: '', proposalAmount: course.fees, proposalStatus: 'Not Started' };
    } else {
      this.displayAlert = true;
      this.displayEnroll = false;
    }
  }
  login() {
    this.route.navigate(['/auth/login']);
  }
  goToDashboard() {
    this.authService.navigateUser();
  }
  sendProposal() {
    if (this.authService.getAuthUser().id && this.courseEnroll.technology_id && this.courseEnroll.proposalAmount) {
      const reqBody: any = {
        id: '',
        user_id: this.authService.getAuthUser().id,
        technology_id: this.courseEnroll.technology_id,
        comments: this.courseEnroll.comments,
        proposalAmount: this.courseEnroll.proposalAmount,
        proposalStatus: 'Not Started'
      };
      this.courseService.courseEnroll(reqBody).subscribe(res => {
        console.log(res);
        this.msgStatus.status = true;
        this.msgStatus.popup = true;
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
    this.courseEnroll = { id: '', user_id: '', technology_id: '', technology: '', name: '', description: '', comments: '', fees: '', proposalAmount: '', proposalStatus: 'Not Started' };
  }
}
