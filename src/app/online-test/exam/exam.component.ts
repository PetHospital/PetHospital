import { Component, OnInit } from '@angular/core';
import {ExamQuestion} from './exam-question';
import {Questions} from './mock-exam-questions';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor() { }

  QuestionLists = Questions;

  ngOnInit() {
  }

}
