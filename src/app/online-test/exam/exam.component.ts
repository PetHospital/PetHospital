import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild  } from '@angular/core';
import { ExamQuestion } from '../../model/model';
import { DataService } from './../../shared/service/data.service';
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
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
  id: number;

  constructor(private dataService: DataService, private http: HttpClient, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.isFinished = false;
    this.route.params.subscribe((params) => this.id = params.id);
    this.dataService.getQuestions(this.id)
                        .subscribe(data => {
                          this.QuestionLists = data;
  });
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
    let exam = {
      examid: this.id,
      submission: obj,
    };
    console.log(exam);
    this.isFinished = true;
    let url = 'http://115.159.143.108/test/submit';
    console.log(JSON.stringify(obj));
    this.http.post(url, exam).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
    });
  }
}
