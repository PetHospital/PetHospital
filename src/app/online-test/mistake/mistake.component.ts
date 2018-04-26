import { Component, OnInit } from '@angular/core';
import { ExamQuestion, TestResult } from '../../model/model';
import { Router } from '@angular/router';
import { DataService } from './../../shared/service/data.service';
@Component({
    selector: 'app-mistake',
    templateUrl: './mistake.component.html',
    styleUrls: ['./mistake.component.scss']
})
export class MistakeComponent implements OnInit {

    allTest: TestResult[];
    WrongList: Array<TestResult> = [];
    options: String[] = ["A", "B", "C", "D"];

    constructor(private dataService: DataService, private router: Router) {
        this.dataService.getTestResult()
            .subscribe(data => {
                this.allTest = data;
                console.log(this.allTest);
                for (let i in this.allTest) {
                    if (this.allTest[i].choice !== this.allTest[i].question.answer) {
                        this.WrongList.push(this.allTest[i]);
                    }
                }
            });
    }
    ngOnInit() {

    }

    back() {
        this.router.navigate(['/practice']);
    }

}
