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
    // @ViewChild('box')
    // boxDiv: ElementRef;

    // constructor(private elementRef: ElementRef, private renderer: Renderer) {
    constructor() {
        this.isHide = true;
        this.index = 0;
        this.pictures = [];
        this.pageCount = 0;
    }

    ngOnInit() {
    }

    // ngAfterViewInit() {
      
    //     this.renderer.setElementStyle(this.boxDiv.nativeElement, 'width', '1620px');
    //     console.log(this.boxDiv.nativeElement.style.width);
    // }
    
    showPic() {
      this.isHide = false;
      this.currentPic = this.pictures[0];
      console.log(this.pictures);
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
