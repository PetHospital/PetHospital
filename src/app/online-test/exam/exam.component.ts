import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild  } from '@angular/core';
import {ExamQuestion} from '../../model/model';
import { DataService } from './../../shared/service/data.service';
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit, AfterViewInit, OnDestroy {

  QuestionLists: any[];
  endDate: number;
  hour: number;
  minute: number;
  second: number;
  time_diff: number;
  startTime: number;
  isFinished: boolean;
  private timer;
  formData = {} as any;
  @ViewChild('examForm') examForm: NgForm;

  constructor(private dataService: DataService, private http: HttpClient) { 
    this.dataService.getQuestions()
                        .subscribe(data => this.QuestionLists = data);
  }

  ngOnInit() {
    this.isFinished = false;
  }
  
  private get diff() {
      return this.time_diff;
  }
  private set diff(val) {
      this.time_diff = Math.floor(val / 1000);
      this.hour = Math.floor(this.time_diff / 3600);
      this.minute = Math.floor((this.time_diff % 3600) / 60);
      this.second = (this.time_diff % 3600) % 60;
  }
    
  ngAfterViewInit() {
      this.startTime = Date.now();
      this.endDate = 3600000;
      this.endDate += this.startTime;
      this.timer = setInterval(() => {
      this.diff = this.endDate - Date.now();
        }, 1000);
      setTimeout(function (){
        console.log("This world is so happy!");
      }, '10000');
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      }
  }

  doSubmit(obj: any) {
    if (!this.examForm.valid) {
      return;
    }
    this.isFinished = true;
    let url = 'http://localhost:8000/';
    console.log(JSON.stringify(obj));
    this.http.post(url, obj).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
    });
  }
}
