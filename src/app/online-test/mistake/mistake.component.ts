import { Component, OnInit } from '@angular/core';
import {ExamQuestion} from '../exam/exam-question';
import {Mistake} from './mistake';
import {MistakeService} from './mistake.service';
@Component({
  selector: 'app-mistake',
  templateUrl: './mistake.component.html',
  styleUrls: ['./mistake.component.scss']
})
export class MistakeComponent implements OnInit {

  WrongList: Mistake[];

  constructor(private mistakeService: MistakeService) { }

  ngOnInit() {
    this.getMisatkes();
  }

  getMisatkes(): void {
    this.WrongList = this.mistakeService.getMistakes();
  }

  viewSolution(id): void {
    this.WrongList[id - 1].showSolution = !this.WrongList[id - 1].showSolution;
  }

  manageCollection(id): void {
    this.WrongList[id - 1].collectStatus = !this.WrongList[id - 1].collectStatus;
  }

}
