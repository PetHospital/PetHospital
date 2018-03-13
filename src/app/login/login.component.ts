import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function() {
      $('#login #password').focus(function() {
          $('#owl-login').addClass('password');
      }).blur(function() {
          $('#owl-login').removeClass('password');
      });
  });
  }

  

}
