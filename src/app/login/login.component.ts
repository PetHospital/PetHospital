import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { NgForm } from "@angular/forms";

import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData = {} as any;
  @ViewChild('loginForm') loginForm: NgForm;

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    $(function() {
      $('#login #password').focus(function() {
          $('#owl-login').addClass('password');
      }).blur(function() {
          $('#owl-login').removeClass('password');
      });
  });
  }

  doSubmit(obj: any) {
    console.log(this.loginForm.valid);
    if (!this.loginForm.valid) {
      return;
    }
    let url = 'http://localhost:8000/users/';
    console.log(JSON.stringify(obj));
    this.http.get(url, obj).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
    });
  }


}
