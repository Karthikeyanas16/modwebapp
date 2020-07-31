import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  msgStatus = { status: false, type: true, message: '' };
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
    });
  }
  signUp() {
    if (this.form.valid) {
      const reqBody = new User(
        this.form.value.email,
        this.form.value.password
      );
      this.authService.createUser(reqBody).subscribe(res => {
        this.msgStatus.status = true;
        this.msgStatus.message = 'Sign Up Successful !';
        this.msgStatus.type = true;
        // this.route.navigate(['/auth/login']);
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
      this.msgStatus.status = true;
      this.msgStatus.message = 'Oops !! Something went wrong, please contact the administrator';
      this.msgStatus.type = false;
    }
    setTimeout(() => {
      this.msgStatus.status = false;
    }, 5000);
  }
}
export class User {
  constructor(public username: string, public password: string) {

  }
}