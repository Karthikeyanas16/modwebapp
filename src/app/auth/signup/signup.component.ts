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
  techList: any = ['Java Full Stack', 'MEAN/MERN Stack', 'Python', 'C/C++'];
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
      accountType: ['student', [
        Validators.required]],
      selectTech: ['', [Validators.required]]
    });
    this.selectTechValidators();
  }
  selectTechValidators() {
    const accountType = this.form.get('accountType');
    const selectTech = this.form.get('selectTech');
    if (accountType.value === 'trainer') {
      selectTech.setValidators(Validators.required);
    } else {
      selectTech.setValidators(null);
      selectTech.setValue('');
    }
    selectTech.updateValueAndValidity();
  }
  signUp() {
    if (this.form.valid) {
      const reqBody = new User(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password,
        this.form.value.accountType,
        this.form.value.selectTech
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
    this.form.value.selectTech.setValue(selected, {
      onlySelf: true
    });
  }
}
export class User {
  constructor(public name: string, public username: string, public password: string, public accountType: string, public selectTech: string) { }
}
