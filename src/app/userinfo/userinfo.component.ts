import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { DataService } from '../shared/service/data.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit, AfterViewInit {
  file: Object;
  currentTab: number;
  customStyle: object;
  userinfo: object;
  formData = {} as any;
  isChanging: boolean;

  constructor(private dataService: DataService, private http: HttpClient) {
    this.file = {};
    this.dataService.getUserInfo()
      .subscribe(data => {
        console.log(data);
        this.userinfo = data;
        this.formData = this.userinfo;
        this.formData.password1 = "";
        this.formData.password2 = "";
      });
  }

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
    this.isChanging = false;
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

  doSubmit = (formData) => {
    console.log('submit');
    if (!formData.password1 || !formData.password2 || formData.password1 !== formData.password2) {
      console.log("error");
      this.onValueChanged(formData);
      return;
    }
    let url = 'http://localhost:8000/changepw';
    this.http.post(url, formData).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      });
  }

  changePw = () => {
    this.isChanging = !this.isChanging;
  }

}
