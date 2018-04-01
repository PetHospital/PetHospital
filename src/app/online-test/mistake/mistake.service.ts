import { Injectable } from '@angular/core';
import { Mistake } from '../../model/model';
import { Mistakes } from './mock-mistakes';
@Injectable()
export class MistakeService {

  constructor() { }
  getMistakes(): Mistake[] {
    return Mistakes;
  }
}
