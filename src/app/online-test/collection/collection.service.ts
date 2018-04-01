import { Injectable } from '@angular/core';
import {Option, ExamQuestion, Collection} from '../../model/model';
import {Collections} from './mock-collection';
@Injectable()
export class CollectionService {

  constructor() { }
  getCollection(): Collection[] {
    return Collections;
  }
}
