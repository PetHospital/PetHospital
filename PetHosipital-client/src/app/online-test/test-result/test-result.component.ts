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

  response: TestResult[];
  result: Array<TestResult>= [];
  selectedQuestion: TestResult;
  type: String;
  id: String;
  isExam: boolean;
  correctNum: number = 0;
  totalNum: number = 0;
  score: number = 0;
  options: String[] = ["A", "B", "C", "D"];

  constructor(private dataService: DataService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.type = params.type);
    this.route.params.subscribe((params) => this.id = params.id);
    this.dataService.getTestResult().subscribe(data => {
      this.response = data;
      for (let single of this.response) {
        if (single.exam_id == this.id) {
          this.result.push(single);
          if (single.choice === single.question.answer) {
            this.correctNum++;
            single.isCorrect = true;
            this.score += single.question.score;
          }else {
            single.isCorrect = false;
          }
          this.totalNum++;
        }
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
