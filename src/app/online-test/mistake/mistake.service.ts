import { Injectable } from '@angular/core';
import { Mistake } from './mistake';
import { Mistakes } from './mock-mistakes';
@Injectable()
export class MistakeService {

  constructor() { }
  getMistakes(): Mistake[] {
    return Mistakes;
  }
}
