import { Component, OnInit, ElementRef } from '@angular/core';
import { CourseService } from '../course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msgStatus = { status: false, type: true, message: '' };
  courseList: any = [];
  searchSub: Subscription;

  constructor(private courseService: CourseService, public el: ElementRef) { }

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

  playSound() {
    const sound: any = this.el.nativeElement.querySelector('#notifSound');
    // sound.play();
  }

}
