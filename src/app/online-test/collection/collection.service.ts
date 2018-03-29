import { Injectable } from '@angular/core';
import {Option, ExamQuestion} from '../exam/exam-question';
import {Collection} from './collection';
import {Collections} from './mock-collection';
@Injectable()
export class CollectionService {

  constructor() { }
  getCollection(): Collection[] {
    return Collections;
  }
}
