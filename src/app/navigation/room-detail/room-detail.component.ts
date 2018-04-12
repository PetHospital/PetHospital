import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/service/data.service';
import { RoomInfo } from '../../model/model';
import * as _ from 'lodash';

@Component({
    selector: 'app-room-detail',
    templateUrl: './room-detail.component.html',
    styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
    private room: RoomInfo;
    private param: any;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService) { }

    ngOnInit() {
        this.route.params
                  .subscribe((params) => this.param = params.id);
        this.dataService.getRoomInfo()
                        .subscribe(data => this.room = data[this.param - 1]);
    }

}
