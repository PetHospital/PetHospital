import { Component, OnInit } from '@angular/core';
import { TestResult, QuestionResult } from '../../model/model';
import { DataService } from './../../shared/service/data.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  result: TestResult;
  selectedQuestion: QuestionResult;

  constructor(private dataService: DataService) { 
    this.dataService.getTestResult().subscribe(data => {
      this.result = data;
    });
  }

  ngOnInit() {
    
  }
  selectQuestion(question: QuestionResult): void {
    this.selectedQuestion = question;
    console.log(this.selectedQuestion);
  }
}
