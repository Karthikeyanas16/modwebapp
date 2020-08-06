import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CourseService } from '../course.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msgStatus = { status: false, type: true, message: '' };
  courseList: any = [];
  searchSub: Subscription;

  constructor(private courseService: CourseService, public el: ElementRef, private authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.navigateUser();
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
  // @HostListener("window:scroll", [])
  // onScroll(): void {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //     // Load Your Data Here
  //     console.log('load data on scroll !!');
  //     // this.getCourseList();
  //   }
  // }
}
