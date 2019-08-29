import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { DataService } from './../../shared/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    isDialogShow: boolean = false;
    showBar: boolean = false;
    isBlur: boolean = false;
    highlightRooms: any[];
    avaliableRooms: any[];


    constructor(private dataService: DataService, private router: Router) {
        this.dataService.getRoleInfo()
            .subscribe(data => this.roleInfo = data);
        this.dataService.getDialogInfo()
            .subscribe(data => this.dialogInfo = data);
    }

    ngOnInit() {
        this.dataService.getCharge().subscribe(
            data => {
                this.avaliableRooms = data;
                console.log(this.avaliableRooms);
            }
        );
    }

    ngAfterViewInit() {
        // this.isBlur = !this.dialog.isClose;
    }

    onClickRole(roleIndex) {
        this.isShow = false;
        this.highlightRooms = this.getRoomIndexs(this.getHighlightRooms(roleIndex));
    }

    onClickRoom(roomIndex) {
        if (this.highlightRooms.indexOf(roomIndex) === -1) {
            return;
        }
        this.isDialogShow = true;
        let self = this;
        setTimeout(() => {
            self.dialog.progresses = this.dialogInfo[roomIndex].progresses;
            self.dialog.clickMessages = this.dialogInfo[roomIndex].clickMessages;
            self.dialog.initMessages();
        }, 1000);

    }

    getHighlightRooms(roleIndex) {
        let rooms = [];
        console.log(this.avaliableRooms);
        for (let room of this.avaliableRooms) {
            if (room.charge.indexOf(roleIndex) !== -1) {
                rooms.push(room);
            }
        }
        return rooms;
    }

    getRoomIndexs(rooms) {
        let indexs = [];
        for (let room of rooms) {
            switch (room.id) {
                case 1:
                    indexs.push(12);
                    break;
                case 2:
                    indexs.push(11);
                    break;
                case 3:
                    indexs.push(13);
                    indexs.push(14);
                    break;
                case 4:
                    indexs.push(10);
                    break;
                case 5:
                    indexs.push(15);
                    break;
                case 6:
                    indexs.push(9);
                    break;
                case 7:
                    indexs.push(8);
                    break;
                case 8:
                    indexs.push(7);
                    break;
                case 9:
                    indexs.push(6);
                    break;
                case 10:
                    indexs.push(4);
                    break;
                case 11:
                    indexs.push(1);
                    break;
                case 12:
                    indexs.push(2);
                    indexs.push(3);
                    break;
                case 13:
                    indexs.push(5);
                    break;
                case 14:
                    indexs.push(0);
                    break;
                default:
                    break;
            }
        }
        return indexs;
    }

    getContentInfo(contentMsg: string) {
        if (contentMsg === "close") {
            this.isDialogShow = false;
            this.dialog.clickMessages = [''];
            this.dialog.progresses = ['您好，我是您的医疗学习小助手。'];
        } else if (contentMsg) {
            let rawContent = _.filter(this.roleInfo, { id: contentMsg })[0];
            this.card.content.title = rawContent.id;
            this.card.content.content = rawContent.data.content;
            this.card.content.pic = rawContent.data.pic;
            this.card.content.vedio = rawContent.data.vedio;
            this.isHide = false;
            this.showBar = true;
        }
    }

    close = () => {
        this.isHide = true;
    }

    back = () => {
        this.isHide = true;
        this.isShow = true;
        this.showBar = false;
        this.isDialogShow = false;
    }

    backToIndex = () => {
        this.router.navigate(['/']);
    }

}
