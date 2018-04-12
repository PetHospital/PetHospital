import { Component, OnInit } from '@angular/core';
import { TestResult, QuestionResult } from '../../model/model';
import { DataService } from './../../shared/service/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  result: TestResult;
  selectedQuestion: QuestionResult;
  type: String;
  isExam: boolean;

  constructor(private dataService: DataService, private route: ActivatedRoute) { 
    this.dataService.getTestResult().subscribe(data => {
      this.result = data;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.type = params.type);
    if (this.type === "exam") {
      this.isExam = true;
    }else {
      this.isExam = false;
    }
    console.log(this.isExam);
  }
  selectQuestion(question: QuestionResult): void {
    this.selectedQuestion = question;
    console.log(this.selectedQuestion);
  }
}
