import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-big-pic',
  templateUrl: './big-pic.component.html',
  styleUrls: ['./big-pic.component.scss']
})
export class BigPicComponent implements OnInit {

  isHide: boolean;
  index: number;
  pageCount: number;
  currentPic: string;

  @Input() pictures: Array<string>;
  ngOnInit () {
    this.currentPic = this.pictures[this.index];
    this.pageCount = this.pictures.length;
  }
  
  constructor() {
    this.isHide = true;
    this.index = 0;
  }

  showPic() {
    this.isHide = false;
  }

  closePic() {
    this.isHide = true;
  }

  upPage() {
    if (this.index < this.pageCount - 1) {
        this.index++;
        this.currentPic = this.pictures[this.index];
    }
  }

  downPage() {
    if (this.index > 0) {
      this.index--;
      this.currentPic = this.pictures[this.index];
    }
  }

}
