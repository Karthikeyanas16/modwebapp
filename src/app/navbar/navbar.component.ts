import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  display: boolean;
  authStatSubs: Subscription;
  isLoggedIn: boolean;
  msgStatus = { status: false, type: true, message: '' };
  constructor(private courseService: CourseService, private authService: AuthService, private route: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsAuth();
    this.authStatSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
    console.log(this.isLoggedIn);
    this.isLoggedIn = true;
    // this.authService.userType = 'mentor';
  }
  doLogout() {
    this.authService.logout();
  }
  searchEmpty(text: string) {
    if (!text) {
      this.getCourseList();
    }
  }
  search(text: string) {
    if (text) {
      this.courseService.searchCourse(text).subscribe(res => {
        console.log('res', res);
        this.route.navigate(['/']);
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
    } else {
      this.getCourseList();
    }

  }
  getCourseList() {
    this.courseService.geAllCourses().subscribe(res => {
      console.log('res', res);
      this.route.navigate(['/']);
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
