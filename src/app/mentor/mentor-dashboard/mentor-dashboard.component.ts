import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/course.service';
import { ActivatedRoute } from '@angular/router';

type NewType = any;

@Component({
  selector: 'app-mentor-dashboard',
  templateUrl: './mentor-dashboard.component.html',
  styleUrls: ['./mentor-dashboard.component.css']
})
export class MentorDashboardComponent implements OnInit {
  msgStatus = { status: false, type: true, message: '' };
  courseList: any = [];
  searchSub: Subscription;
  search: string;
  private sub: any;
  constructor(private courseService: CourseService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.routes.params.subscribe(params => {
      this.search = params['search'];
      this.search === 'list' ? this.getMentorCourses() : this.getCoursesByStatus();
    });
    this.searchSub = this.courseService.courses.subscribe((value) => {
      this.courseList = value;
    });
  }

  getMentorCourses() {
    this.courseService.getMentorCourses().subscribe(res => {
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
    this.courseService.getCoursesByMentor(this.search).subscribe(res => {
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
  acceptProposal(course: any, type: string) {
    const reqBody = { user_id: course.user_id, mentor_id: course.mentor_id, technology_id: course.technology_id, proposalStatus: type };
    this.courseService.acceptProposal(reqBody).subscribe(res => {
      this.msgStatus.message = 'Proposal' + type + 'Successfully';
      this.msgStatus.status = false;
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
