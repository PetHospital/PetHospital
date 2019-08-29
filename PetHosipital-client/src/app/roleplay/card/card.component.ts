import { Component, Input, ViewChild, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { BigPicComponent } from './../big-pic/big-pic.component';
import { Info } from '../info';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @ViewChild('myvideo') myvideo: ElementRef;
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

    ngOnInit() {
        let video = this.myvideo.nativeElement;
        video.on("loadeddata", function () {
            let canvas = document.createElement("canvas");
            canvas.width = video.videoWidth * 0.8;
            canvas.height = video.videoHeight * 0.8;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            video.setAttribute("poster", canvas.toDataURL("image/png"));
        });
    }

    onShowPic() {
        this.bigPic.pictures = this.content.pic;
        this.bigPic.showPic();
    }

    close() {
        this.isClose.emit("close");
    }

}
