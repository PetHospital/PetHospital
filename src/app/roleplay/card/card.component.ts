import { Component, Input, ViewChild, OnInit } from '@angular/core';
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

}
