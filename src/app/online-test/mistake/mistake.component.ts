import { Component, OnInit } from '@angular/core';
import {ExamQuestion, Mistake} from '../../model/model';
import { DataService } from './../../shared/service/data.service';
@Component({
  selector: 'app-mistake',
  templateUrl: './mistake.component.html',
  styleUrls: ['./mistake.component.scss']
})
export class MistakeComponent implements OnInit {

  WrongList: any[];

  constructor(private dataService: DataService) { 
    this.dataService.getMistakes()
                        .subscribe(data => this.WrongList = data);
  }
  ngOnInit() {
    
  }

  viewSolution(id): void {
    this.WrongList[id - 1].showSolution = !this.WrongList[id - 1].showSolution;
  }

  manageCollection(id): void {
    this.WrongList[id - 1].collectStatus = !this.WrongList[id - 1].collectStatus;
  }

}
