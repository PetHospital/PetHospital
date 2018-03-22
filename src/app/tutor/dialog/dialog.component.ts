import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor() { }

  progresses = [
    'first step',
    'second step',
    'third step',
    'fourth step'
  ];

  userMessage = {
    "true": "Yes I understand",
    "false": "Sorry I don't get it"
  };

  currentIndex = 0;
  messages = [];

  ngOnInit() {
    this.messages.push({
      "content": this.progresses[0],
      "isUser": false
    });
  }

  addSysMessage = (flag) => {
    if (flag) {
      this.currentIndex ++;
    }
    this.messages.push({
      "content": this.progresses[this.currentIndex],
      "isUser": false
    });
  }

  addUserMessage = (flag) => {
    this.messages.push({
      "content": this.userMessage[flag],
      "isUser": true
    });
    this.addSysMessage(flag);    
  }
}
