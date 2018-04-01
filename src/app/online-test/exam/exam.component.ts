import { Component, OnInit } from '@angular/core';
import {ExamQuestion} from '../../model/model';
import {ExamService} from './exam.service';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  QuestionLists: ExamQuestion[];

  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.getQuestions();
  }
  getQuestions(): void {
    this.QuestionLists = this.examService.getQuestions();
  }
}
