import { Injectable } from '@angular/core';
import {ExamQuestion} from '../../model/model';
import {Questions} from './mock-exam-questions';
@Injectable()
export class ExamService {

  constructor() { }
  getQuestions(): ExamQuestion[] {
    return Questions;
  }
}
