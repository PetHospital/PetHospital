import { Injectable } from '@angular/core';
import {ExamQuestion} from './exam-question';
import {Questions} from './mock-exam-questions';
@Injectable()
export class ExamService {

  constructor() { }
  getQuestions(): ExamQuestion[] {
    return Questions;
  }
}
