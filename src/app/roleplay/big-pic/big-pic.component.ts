import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';

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
    pictures: Array<string>;
    constructor() {
        this.isHide = true;
        this.index = 0;
        this.pictures = [];
        this.pageCount = 0;
    }

    ngOnInit() {
    }
    
    showPic() {
      this.isHide = false;
      this.currentPic = this.pictures[0];
    }

    closePic() {
      this.isHide = true;
    }

    upPage() {
      if (this.index < this.pictures.length - 1) {
          this.index++;
      } else {
        this.index = 0;
      }
      this.currentPic = this.pictures[this.index];      
    }

    downPage() {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.pictures.length - 1;
      }
      this.currentPic = this.pictures[this.index];      
    }

}
