import { Component, OnInit } from '@angular/core';
import {ExamItem} from '../../model/model';
import { DataService } from './../../shared/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {

  examList: ExamItem[];

  constructor(private dataService: DataService,
              private router: Router) {
    this.dataService.getExamItem().subscribe(data => {
      this.examList = data; 
    });
  }

  ngOnInit() {
  }

}
