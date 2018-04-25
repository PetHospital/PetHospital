import { Component, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { BigPicComponent } from './../big-pic/big-pic.component';
import { Info } from '../info';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @ViewChild(BigPicComponent)
  bigPic: BigPicComponent;
  coverPic: string;
  content: Info;

  @Output() isClose: EventEmitter<any> = new EventEmitter();
  

  constructor() {
    this.content = {
      title: '',
      content: '',
      pic: [],
      vedio: ''
    };
  }

  onShowPic() {
    this.bigPic.pictures = this.content.pic;
    this.bigPic.showPic();
  }

  close() {
      this.isClose.emit("close");
  }

}
