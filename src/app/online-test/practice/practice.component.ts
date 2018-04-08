import { Component, OnInit } from '@angular/core';
import {PracticeItem, PracticeTitle, PracticeTab} from '../../model/model';
import { DataService } from './../../shared/service/data.service';
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  practiceTitles: PracticeTitle[] = [
    { id: 1, name: "顺序练习"},
    { id: 3, name: "在线考试"}];

  OnSelectedTitle = this.practiceTitles[0];

  practiceTabs: PracticeTab[] = [
    {id: 1, name: "全部"},
    {id: 2, name: "入门题目"},
    {id: 3, name: "中等题目"},
    {id: 4, name: "官方难题"}
  ];

  OnSelectedTab = this.practiceTabs[0];

  practiceItems: PracticeItem[];

  OnSelectedItem: PracticeItem;

  constructor(private dataService: DataService) {
    this.dataService.getPracticeItem().subscribe(data => this.practiceItems = data);
   }
  ngOnInit() {
  }

  SelectList(title: PracticeTitle): void {
    this.OnSelectedTitle = title;
  }
  
  SelectTab(tab: PracticeTab): void {
    this.OnSelectedTab = tab;
  }

  SelectItem(item: PracticeItem): void {
    this.OnSelectedItem = item;
  }

}
