import { Component, OnInit } from '@angular/core';
import {ExamQuestion} from '../../model/model';
import { DataService } from './../../shared/service/data.service';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  QuestionLists: any[];

  constructor(private dataService: DataService) { 
    this.dataService.getQuestions()
                        .subscribe(data => this.QuestionLists = data);
  }

  ngOnInit() {
  }
}
