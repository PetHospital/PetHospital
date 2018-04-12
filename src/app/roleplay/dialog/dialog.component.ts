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

  constructor() { 
    this.progresses = ['您好，我是您的医疗助手。'];
    this.clickMessages = [];
  }

  userMessage = {
    "true": "Yes I understand",
    "false": "Sorry I don't get it"
  };

  currentIndex = 0;
  messages = [];

  ngOnInit() {
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
