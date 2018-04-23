import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/service/data.service';
import { RoomInfo } from '../../model/model';
import * as _ from 'lodash';

const roleName = {
    0: '前台',
    1: '医助',
    2: '执业兽医师',
};
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
        private dataService: DataService,
        private router: Router) { }

    ngOnInit() {
        this.route.params
                  .subscribe((params) => this.param = params.id);
        this.dataService.getRoomInfo()
                        .subscribe(data => {
                            this.room = data[this.param - 1];
                            this.room.charge = this.parseName(this.room.charge);
                        });
    }

    back() {
        this.router.navigate(['/navigation']);
    }

    parseName(charge) {
        let charges = [];
        for (let person of charge) {
            charges.push(roleName[person]);
        }
        return charges.toString();
    }

}
