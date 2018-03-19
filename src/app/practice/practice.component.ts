import { Component, OnInit } from '@angular/core';
import {PracticeItem} from './practice-item';
import {PracticeList} from './practice-list';
import {PracticeTab} from './practice-tab';
import {LISTS} from './mock-practice-lists';
import {TABS} from './mock-practice-tabs';
import {ITEMS} from './mock-practice-items';
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  constructor() { }
  
  lists = LISTS;
  OnSelectedList = this.lists[0];

  tabs = TABS;
  OnSelectedTab = this.tabs[0];

  items = ITEMS;
  OnSelectedItem: PracticeItem;

  SelectList(list: PracticeList): void {
    this.OnSelectedList = list;
  }
  
  SelectTab(tab: PracticeTab): void {
    this.OnSelectedTab = tab;
  }

  ngOnInit() {
  }

}
