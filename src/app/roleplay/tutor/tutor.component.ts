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
    contentInfo: string;
    isHide: boolean = true;
    @ViewChild(CardComponent)
    card: CardComponent;
    roleInfo: any[];

    constructor(private dataService: DataService) {
        this.dataService.getRoleInfo()
                        .subscribe(data => this.roleInfo = data);
    }

    ngOnInit() {
    }

    getContentInfo(contentMsg: string) {
        this.contentInfo = contentMsg;
        console.log("message:");
        console.log(this.contentInfo);

        switch (this.contentInfo) {
        case "close":
            this.isHide = true;
            break;
        }

        this.card.content = _.filter(this.roleInfo, {id: contentMsg});
        console.log(this.card.content);
    }
}
