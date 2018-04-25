import { Component, OnInit } from '@angular/core';
import { TestResult} from '../../model/model';
import { DataService } from './../../shared/service/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  result: TestResult[];
  selectedQuestion: TestResult;
  type: String;
  id: String;
  isExam: boolean;
  correctNum: number = 0;
  totalNum: number = 0;
  score: number = 0;

  constructor(private dataService: DataService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.type = params.type);
    this.route.params.subscribe((params) => this.id = params.id);
    this.dataService.getTestResult().subscribe(data => {
      this.result = data;
      for (let i in this.result) {
        if (this.result[i].choice === this.result[i].question.answer) {
          this.correctNum++;
          this.result[i].isCorrect = true;
          this.score += this.result[i].question.score;
        }else {
          this.result[i].isCorrect = false;
        }
        this.totalNum++;
      }
    });
    if (this.type === "exam") {
      this.isExam = true;
    }else {
      this.isExam = false;
    }
  }
  selectQuestion(question: TestResult): void {
    this.selectedQuestion = question;
  }
}
