import { Component, OnInit } from '@angular/core';
import { DataService } from './../shared/service/data.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    private status: boolean;
    private username: string;

    constructor(private dataService: DataService) {
        this.status = false;
        this.username = 'Pandaice';
    }

    ngOnInit() {

    }

    Logout() {
        this.status = false;
    }

}
