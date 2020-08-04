import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
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
  isTrainer: boolean;
  // techList: any = ['Java Full Stack', 'MEAN/MERN Stack', 'Python', 'C/C++'];
  techList: any = [];
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) {
    this.getTechList();
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
      role: ['student', [
        Validators.required]],
      technology: ['', [Validators.required]]
    });
    this.selectTechValidators();
    console.log(this.form.touched);
  }
  selectTechValidators() {
    const accountType = this.form.get('role');
    const selectedTech = this.form.get('technology');
    if (accountType.value === 'trainer') {
      selectedTech.setValidators(Validators.required);
    } else {
      selectedTech.setValidators(null);
      selectedTech.setValue('');
    }
    selectedTech.updateValueAndValidity();
  }
  signUp() {
    if (this.form.valid) {
      const reqBody = new User(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password,
        this.form.value.role,
        this.form.value.technology
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
  changeAccType(type: string) {
    type === 'trainer' ? this.isTrainer = true : this.isTrainer = false;
    this.selectTechValidators();
  }
  changeTechnology(selected) {
    this.form.value.technology.setValue(selected, {
      onlySelf: true
    });
  }
  getTechList() {
    this.authService.getTechList().subscribe(res => {
      this.techList = res;
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
export class User {
  // tslint:disable-next-line:max-line-length
  constructor(public name: string, public email: string, public password: string, public role: string, public technology: string) { }
}
