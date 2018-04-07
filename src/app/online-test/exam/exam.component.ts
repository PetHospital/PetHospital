import { Component, OnInit, OnDestroy, AfterViewInit  } from '@angular/core';
import {ExamQuestion} from '../../model/model';
import { DataService } from './../../shared/service/data.service';
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
  private timer;

  constructor(private dataService: DataService) { 
    this.dataService.getQuestions()
                        .subscribe(data => this.QuestionLists = data);
  }

  ngOnInit() {
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
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      }
  }
}
