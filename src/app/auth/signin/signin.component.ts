import {
  Component, OnInit, EventEmitter, Output
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  msgStatus = { status: false, type: true, message: '' };
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) {

  }

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

  login() {
    console.log(`Login ${this.form.value}`);
    if (this.form.valid) {
      const reqBody = new User(
        this.form.value.email,
        this.form.value.password
      );
      this.authService.loginUser(reqBody).subscribe(
        response => {
          this.msgStatus.status = true;
          this.msgStatus.message = 'Login Successful !';
          this.msgStatus.type = true;
          this.route.navigate(['/admin']);
        },
        error => {
          console.log('error', error);
          let msg = 'Oops !! Something went wrong, please contact the administrator';
          if (error.error.error) {
            msg = error.error.error;
          }
          this.msgStatus.status = true;
          this.msgStatus.message = msg;
          this.msgStatus.type = false;
        }
      );
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
