import { Component, OnInit } from '@angular/core';
import {PracticeItem} from './practice-item';
import {PracticeList} from './practice-list';
import {PracticeTab} from './practice-tab';
import {PracticeService} from './practice.service';
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  lists: PracticeList[];

  OnSelectedList: PracticeList;

  tabs: PracticeTab[];

  OnSelectedTab: PracticeTab;

  items: PracticeItem[];

  OnSelectedItem: PracticeItem;

  constructor(private practiceService: PracticeService) { }
  ngOnInit() {
    this.getPractice();
  }

  getPractice(): void {
    this.items = this.practiceService.getItems();
    this.OnSelectedItem = this.items[0];
    this.lists = this.practiceService.getLists();
    this.OnSelectedList = this.lists[0];
    this.tabs = this.practiceService.getTabs();
    this.OnSelectedTab = this.tabs[0];
  }

  SelectList(list: PracticeList): void {
    this.OnSelectedList = list;
  }
  
  SelectTab(tab: PracticeTab): void {
    this.OnSelectedTab = tab;
  }

  SelectItem(item: PracticeItem): void {
    this.OnSelectedItem = item;
  }

}
