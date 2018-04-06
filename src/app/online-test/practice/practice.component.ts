import { Component, OnInit } from '@angular/core';
import {PracticeItem, PracticeTitle, PracticeTab} from '../../model/model';
import { DataService } from './../../shared/service/data.service';
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  practiceTitles: PracticeTitle[];

  OnSelectedTitle: PracticeTitle;

  practiceTabs: PracticeTab[];

  OnSelectedTab: PracticeTab;

  practiceItems: PracticeItem[];

  OnSelectedItem: PracticeItem;

  constructor(private dataService: DataService) {
    this.dataService.getPracticeTitle().subscribe(data => this.practiceTitles = data);
    this.dataService.getPracticeTab().subscribe(data => this.practiceTabs = data);
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
