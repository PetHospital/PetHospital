import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit, AfterViewInit {
  file: Object;
  currentTab: number;
  customStyle: object;
  constructor() { 
    this.file = {};
  }
  
  formData = {} as any;
  isUploadingImage: boolean;
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

  @ViewChild('changeInfoForm') changeInfoForm: NgForm;

  ngAfterViewInit(): void {
    this.changeInfoForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data) {
    if (!this.changeInfoForm) {
      return;
    }
    if (this.formErrors) {
      for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = this.changeInfoForm.form.get(field);
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
  ngOnInit() {
    this.currentTab = 0;
    this.isUploadingImage = false;
    this.customStyle = {
      selectButton: {
        "background-color": "yellow",
        "border-radius": "10px",
        "color": "#000"
      },
      clearButton: {
        "background-color": "#FFF",
        "border-radius": "10px",
        "color": "#000",
        "margin-left": "10px"
      },
      layout: {
        "background-color": "purple",
        "border-radius": "10px",
        "color": "#FFF",
        "font-size": "15px",
        "margin": "10px",
        "padding-top": "5px",
        "width": "500px"
      },
      previewPanel: {
        "background-color": "white",
        "border-radius": "0 0 10px 10px",
      }
    };
  }
  closeImage = () => {
    this.isUploadingImage = false;
  }

  changeAvatar = () => {
    this.isUploadingImage = true;
    console.log(this.isUploadingImage);
  }

  switchTabs = (tabId) => {
    this.currentTab = tabId;
  }

  imageUploaded(event) {
    console.log(event);
    this.file = event.file;
    console.log(this.file);
  }

  imageRemoved(event) {
    console.log(event);
  }

  confirmImage = () => {
    this.closeImage();
  }

}
