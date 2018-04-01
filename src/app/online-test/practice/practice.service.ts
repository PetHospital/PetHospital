import { Injectable } from '@angular/core';
import {PracticeItem} from '../../model/model';
import {PracticeList} from './practice-list';
import {PracticeTab} from './practice-tab';
import {LISTS} from './mock-practice-lists';
import {TABS} from './mock-practice-tabs';
import {ITEMS} from './mock-practice-items';
@Injectable()
export class PracticeService {

  constructor() { }
  getLists(): PracticeList[] {
    return LISTS;
  }
  getTabs(): PracticeTab[] {
    return TABS;
  }
  getItems(): PracticeItem[] {
    return ITEMS;
  }
}
