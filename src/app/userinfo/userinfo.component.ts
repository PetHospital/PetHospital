import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { DataService } from '../shared/service/data.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterConfigLoader } from '@angular/router/src/router_config_loader';

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
  showMessage: boolean;
  showError: boolean;
  exams: any[];

  constructor(private dataService: DataService, private http: HttpClient, private router: Router) {
    this.file = {};
    this.exams = [];
    this.dataService.getUserInfo()
      .subscribe(data => {
        this.userinfo = data;
        this.formData = this.userinfo;
        this.formData.password1 = "";
        this.formData.password2 = "";
      });

    this.dataService.getAllExams().subscribe(data => {
      console.log(data);
      for (let exam of data) {
        console.log(exam);
        if (exam.taken === true) {
          console.log(this.exams);
          this.exams.push(exam);
        }
      }
      console.log(this.exams);
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
    this.showMessage = false;
    this.showError = false;
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
  }

  switchTabs = (tabId) => {
    this.currentTab = tabId;
  }

  imageUploaded(event) {
    this.file = event.file;
  }

  imageRemoved(event) {
  }

  confirmImage = () => {
    this.closeImage();
  }

  getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return (arr[2]);
    } else {
      return null;
    }
  }

  doSubmit = (formData) => {
    if (!formData.password1 || !formData.password2 || formData.password1 !== formData.password2) {
      this.onValueChanged(formData);
      return;
    }

    const API_URL = environment.apiUrl;

    const data = {
      new_password: formData.password1
    };

    this.dataService.changePw(data).subscribe(
      response => {
        if (!response.success === true) {
          this.showMessage = true;
          let exp = new Date();
          exp.setTime(exp.getTime() - 1);
          let cval = this.getCookie("token");
          if (cval != null) {
            document.cookie = "token=" + cval + ";expires=" + exp.toUTCString();
          }
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1800);
        } else {
          this.showError = true;
        }

      },
      err => {
        console.log(err);
      });
  }

  changePw = () => {
    this.isChanging = !this.isChanging;
  }

}
