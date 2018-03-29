import { Component, OnInit } from '@angular/core';
import { DataService } from './../shared/service/data.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(private dataService: DataService) {
        this.dataService.getRoomInfo()
                 .subscribe(data => console.log(data));
    }

    ngOnInit() {
    }

}
