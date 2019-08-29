import { Component, OnInit } from '@angular/core';
import {SingleItem, PracticeItem, PracticeTitle, PracticeTab, ExamUser} from '../../model/model';
import { DataService } from './../../shared/service/data.service';
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  practiceTabs: PracticeTab[] = [
    {id: 1, name: "全部"},
    {id: 2, name: "入门题目"},
    {id: 3, name: "中等题目"},
    {id: 4, name: "官方难题"}
  ];

  level: String[] = [
    "easy", "normal", "hard", "low", "medium", "high"
  ];

  OnSelectedTab = this.practiceTabs[0];

  practiceItems: PracticeItem[];
  examUser: ExamUser[];
  easyItems: Array<PracticeItem> = [];
  normalItems: Array<PracticeItem> = [];
  hardItems: Array<PracticeItem> = [];

  easy: boolean;
  normal: boolean;
  hard: boolean;

  constructor(private dataService: DataService) {
    this.dataService.getPracticeItem().subscribe(data => { 
      this.practiceItems = data;
      for (let i in this.practiceItems) {
        if (this.practiceItems[i].level === "easy") {
          this.easyItems.push(this.practiceItems[i]);
       }else if (this.practiceItems[i].level === "normal") {
         this.normalItems.push(this.practiceItems[i]);
       }else if (this.practiceItems[i].level === "hard") {
         this.hardItems.push(this.practiceItems[i]);
       }
      }
    });
    this.dataService.getExamUser().subscribe(data => {
      this.examUser = data;
    });
    this.easy = true;
    this.normal = true;
    this.hard = true;
   }
  ngOnInit() {
  }
  
  SelectTab(tab: PracticeTab): void {
    this.OnSelectedTab = tab;
    if (tab.name === "全部") {
      this.easy = true;
      this.normal = true;
      this.hard = true;
    }else if (tab.name === "入门题目") {
      this.easy = true;
      this.normal = false;
      this.hard = false;
    }else if (tab.name === "中等题目") {
      this.easy = false;
      this.normal = true;
      this.hard = false;
    }else if (tab.name === "官方难题") {
      this.easy = false;
      this.normal = false;
      this.hard = true;
    }
  }

}
