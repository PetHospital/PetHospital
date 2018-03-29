import { Component, OnInit, ViewChild } from '@angular/core';
import { CardComponent} from '../card/card.component';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {
  contentInfo: string;
  isHide: boolean = true;
  @ViewChild(CardComponent)
  card: CardComponent;



  getContentInfo(contentMsg: string) {
      this.contentInfo = contentMsg;
      console.log("message:");
      console.log(this.contentInfo);

      switch (this.contentInfo) {
        case "close":
          this.isHide = true;
          break;
        case "wc":
          this.card.content = "wc";
          this.isHide = false;
          break;
        case "pet":
          this.card.content = "pet";
          this.isHide = false;
          break;
      }
  }

  constructor() { }

  ngOnInit() {
  }
}
