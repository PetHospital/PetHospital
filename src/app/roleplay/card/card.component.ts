import { Component, Input, ViewChild } from '@angular/core';
import { BigPicComponent } from './../big-pic/big-pic.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @ViewChild(BigPicComponent)
  bigPic: BigPicComponent;
  pictures: Array<string>;
  coverPic: string;
  content: string;
  
  constructor() {
    this.pictures = ["../../assets/images/role/cat1.jpg", "../../assets/images/role/cat2.jpg", "../../assets/images/role/cat3.jpeg"];
    this.coverPic = this.pictures[0];
  }
  onShowPic() {
    this.bigPic.showPic();
  }

}
