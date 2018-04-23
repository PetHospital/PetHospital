import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CardComponent} from '../card/card.component';
import { DataService } from './../../shared/service/data.service';

import * as _ from 'lodash';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-tutor',
    templateUrl: './tutor.component.html',
    styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit, AfterViewInit {
    @ViewChild(CardComponent)
    card: CardComponent;
    @ViewChild(DialogComponent)
    dialog: DialogComponent;
    roleInfo: any[];
    dialogInfo: any[];
    isHide: boolean = true;
    isShow: boolean = true;
    showBar: boolean = false;
    isBlur: boolean = false;
    currentRole: number;
    highlightRooms: any[];
    avaliableRooms: any[];

    constructor(private dataService: DataService) {
        this.dataService.getRoleInfo()
                        .subscribe(data => this.roleInfo = data);
        this.dataService.getDialogInfo()
                        .subscribe(data => this.dialogInfo = data);
    }

    ngOnInit() {
        this.dataService.getRoomInfo().subscribe(
            data => {
                this.avaliableRooms = data;
            }
        );
    }

    ngAfterViewInit() {
        // this.isBlur = !this.dialog.isClose;
    }

    onClickRole(roleIndex) {
        this.isShow = false;
        this.currentRole = roleIndex;
        this.dialog.progresses = this.dialogInfo[roleIndex].progresses;
        this.dialog.clickMessages = this.dialogInfo[roleIndex].clickMessages;
        this.dialog.initMessages();
        this.highlightRooms = this.getHighlightRooms(roleIndex);
        console.log(this.highlightRooms);
    }

    getHighlightRooms(roleIndex) {
        let rooms = [];
        for (let room of this.avaliableRooms) {
            if (room.charge.indexOf(roleIndex) !== -1) {
                rooms.push(room);
            }
        }
        return rooms;
    }
    
    getContentInfo(contentMsg: string) {
       if (contentMsg === "close") {
            this.isHide = true;
            this.isShow = true;
            this.showBar = false;
            this.dialog.clickMessages = [''];
            this.dialog.progresses = ['您好，我是您的医疗助手。'];
            console.log(this.dialog);
        } else if (contentMsg) {
        let rawContent = _.filter(this.roleInfo, {id: contentMsg})[0];
        this.card.content.title = rawContent.id;
        this.card.content.content = rawContent.data.content;
        this.card.content.pic = rawContent.data.pic;
        this.card.content.vedio = rawContent.data.vedio;
        console.log(this.card.content);
        this.isHide = false;
        this.showBar = true;
       }
    }

    mouseover(e) {
        console.log(e.pageX, e.pageY);
    }
}
