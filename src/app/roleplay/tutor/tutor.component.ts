import { Component, OnInit, ViewChild } from '@angular/core';
import { CardComponent} from '../card/card.component';
import { DataService } from './../../shared/service/data.service';

import * as _ from 'lodash';

@Component({
    selector: 'app-tutor',
    templateUrl: './tutor.component.html',
    styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {
    @ViewChild(CardComponent)
    card: CardComponent;
    roleInfo: any[];
    isHide: boolean = true;

    constructor(private dataService: DataService) {
        this.dataService.getRoleInfo()
                        .subscribe(data => this.roleInfo = data);
    }

    ngOnInit() {}

    getContentInfo(contentMsg: string) {
       if (contentMsg === "close") {
            this.isHide = true;
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
