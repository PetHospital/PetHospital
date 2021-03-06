import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, AfterViewInit {
  formData = {} as any;
  isHide: boolean;
  constructor(
    private http: HttpClient,
  ) {
    this.isHide = true;
  }
  formErrors = {
    'email': '',
    'userName': '',
    'password1': '',
    'password2': '',
    'phone': ''
  };

  validationMessages = {
    'email': {
      'required': '邮箱必须填写.',
      'pattern': '邮箱格式不对',
    },
    'userName': {
      'required': '用户名必填.',
      'minlength': '用户名太短',
    },
    'password1': {
      'required': '请输入密码',
      'minlength': '密码太短',
    },
    'password2': {
      'required': '请重复输入密码',
      'minlength': '密码太短',
    },
    'phone': {
      'required': '手机号必须填写.',
      'pattern': '手机号格式不对',
    },
  };

  @ViewChild('registerForm') registerForm: NgForm;

  ngAfterViewInit(): void {
    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data) {
    if (this.formErrors) {
      for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = this.registerForm.form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              this.formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }

  doSubmit(obj: any) {
    if (!this.registerForm.valid) {
      this.onValueChanged(obj);
      return;
    }
    const API_URL = environment.apiUrl;
    let url = API_URL + '/user/register';
    this.http.post(url, obj).subscribe(
      data => {
        if (true) {
            this.isHide = false;
        }
      },
      err => {
        console.log(err);
    });
  }

  ngOnInit() {
  }

}
