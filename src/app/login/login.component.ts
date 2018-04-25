import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router
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
    if (!this.loginForm.valid) {
      return;
    }
    const API_URL = environment.apiUrl;
    let url = API_URL + '/user/login';
    console.log(url);
    this.http.post(url, obj).subscribe(
      data => {
        let result = data;
        if (!result["token"]) {
          
        }
        let time = 2 * 3600 * 1000;
        let exp = new Date();
        exp.setTime(exp.getTime() + time);
        document.cookie = "token=" + result["token"] + ";expires=" + exp.toUTCString();
        this.router.navigate(['/']);        
      },
      err => {
        console.log(err);
    });
  }
}
