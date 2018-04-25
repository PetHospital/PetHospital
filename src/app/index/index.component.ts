import { Component, OnInit } from '@angular/core';
import { DataService } from './../shared/service/data.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    public status: boolean;
    private username: string;

    constructor(private dataService: DataService) {
        const token = this.getCookie('token');
        if (token && token !== '') {
            this.status = true;
            this.username = 'Pandaice';
        } else {
            this.status = false;
        }
    }

    ngOnInit() {

    }

    getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return (arr[2]);
        } else {
            return null;
        }
    }

    Logout() {
        this.status = false;
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = this.getCookie("token");
        if (cval != null) {
            document.cookie = "token=" + cval + ";expires=" + exp.toUTCString();
        }
    }

}
