import { Component, OnInit, Input, ViewChild, EventEmitter, Output} from '@angular/core';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Output() dialogMsg: EventEmitter<any> = new EventEmitter();
  isClose: boolean;
  progresses: Array<string>;
  clickMessages: Array<string>;
  messages: Array<Object>;
  currentIndex: number;

  constructor() { 
    this.progresses = ['您好，我是您的医疗学习小助手。'];
    this.clickMessages = [''];
    this.messages = [];
    this.currentIndex = 0;
  }

  userMessage = {
    "true": "好的明白了！",
    "false": "可以再讲一遍吗？"
  };

  ngOnInit() {
    this.messages = [];
    this.currentIndex = 0;
    this.messages.push({
      "content": this.progresses[0],
      "isUser": false,
      "clickMsg": this.clickMessages[0]
    });
  }

  initMessages() {
    this.messages = [];
    this.currentIndex = 0;
    this.messages.push({
      "content": this.progresses[0],
      "isUser": false,
      "clickMsg": this.clickMessages[0]
    });
  }

  addSysMessage = (flag) => {
    if (flag) {
      this.currentIndex ++;
    }
    this.messages.push({
      "content": this.progresses[this.currentIndex],
      "isUser": false,
      "clickMsg": this.clickMessages[this.currentIndex]
    });
  }

  addUserMessage = (flag) => {
    this.messages.push({
      "content": this.userMessage[flag],
      "isUser": true,
      "clickMsg": null
    });
    
    setTimeout(() => this.addSysMessage(flag), 1000);
  }

  onClickMsg(clickMsg) {
    if (clickMsg) {
      this.dialogMsg.emit(clickMsg);
    }
  }

  onClose() {
    this.messages = null;
    this.isClose = true;
    if (this.isClose) {
      this.dialogMsg.emit("close");
    }
  }
}
