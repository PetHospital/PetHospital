import { Component, OnInit, ViewChild } from '@angular/core';
import { CardComponent} from '../card/card.component';
import { DataService } from './../../shared/service/data.service';

import * as _ from 'lodash';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-tutor',
    templateUrl: './tutor.component.html',
    styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {
    @ViewChild(CardComponent)
    card: CardComponent;
    @ViewChild(DialogComponent)
    dialog: DialogComponent;
    roleInfo: any[];
    dialogInfo: any[];
    isHide: boolean = true;
    isShow: boolean = true;

    constructor(private dataService: DataService) {
        this.dataService.getRoleInfo()
                        .subscribe(data => this.roleInfo = data);
        this.dataService.getDialogInfo()
                        .subscribe(data => this.dialogInfo = data);
    }

    ngOnInit() {}
    onClickQian() {
        this.isShow = false;
        console.log(this.dialog);
        this.dialog.progresses = this.dialogInfo[0].progresses;
        console.log(this.dialogInfo[0].progresses);
        this.dialog.clickMessages = this.dialogInfo[0].clickMessages;
    }
    onClickYi() {
        this.isShow = false;
        this.dialog.progresses = this.dialogInfo[1].progresses;
        this.dialog.clickMessages = this.dialogInfo[1].clickMessages;
    }
    onClickShou() {
        this.isShow = false;
        this.dialog.progresses = this.dialogInfo[2].progresses;
        this.dialog.clickMessages = this.dialogInfo[2].clickMessages;
    }

    getContentInfo(contentMsg: string) {
       if (contentMsg === "close") {
            this.isHide = true;
            this.isShow = true;
            this.dialog.clickMessages = [];
            this.dialog.progresses = ['您好，我是您的医疗助手。'];
        } else if (contentMsg) {
        let rawContent = _.filter(this.roleInfo, {id: contentMsg})[0];
        this.card.content.title = rawContent.id;
        this.card.content.content = rawContent.data.content;
        this.card.content.pic = rawContent.data.pic;
        this.card.content.vedio = rawContent.data.vedio;
        console.log(this.card.content);
        this.isHide = false;
       }
    }
}
