import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild  } from '@angular/core';
import { ExamQuestion } from '../../model/model';
import { DataService } from './../../shared/service/data.service';
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit, AfterViewInit, OnDestroy {
  QuestionLists: any[];

  hour: number;
  minute: number;
  second: number;
  time_diff: number;
  count: number = 0;

  isFinished: boolean;
  showSolution: boolean[] = [false, false, false, false, false];
  options: String[] = ["A", "B", "C", "D"];
  
  private timer;
  formData = {} as any;
  @ViewChild('exerciseForm') exerciseForm: NgForm;
  level: String;

  private get diff() {
    return this.time_diff;
  }
  private set diff(val) {
    this.time_diff = Math.floor(val / 1000);
    this.hour = Math.floor(this.time_diff / 3600);
    this.minute = Math.floor((this.time_diff % 3600) / 60);
    this.second = (this.time_diff % 3600) % 60;
  }
  constructor(private dataService: DataService, private http: HttpClient, private route: ActivatedRoute) {
    
  }
  ngOnInit() {
    this.isFinished = false;
    this.route.params.subscribe((params) => this.level = params.level);
    this.dataService.getExercise(this.level)
                        .subscribe(data => {
                          this.QuestionLists = data;
                        });
  }
  ngAfterViewInit() {
    this.timer = setInterval(() => {
    this.diff = this.count + 1000;
    this.count = this.count + 1000;
      }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) {
       clearInterval(this.timer);
    }
  }
  

  doSubmit(obj: any) {
    this.isFinished = true;
    this.showSolution = [true, true, true, true, true];
    clearInterval(this.timer);
  }
}
