import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements AfterViewInit, OnDestroy {

    endDate: number;
    hour: number;
    minute: number;
    second: number;
    time_diff: number;
    startTime: number;

    private get diff() {
        return this.time_diff;
    }
    private set diff(val) {
        this.time_diff = Math.floor(val / 1000);
        this.hour = Math.floor(this.time_diff / 3600);
        this.minute = Math.floor((this.time_diff % 3600) / 60);
        this.second = (this.time_diff % 3600) % 60;
    }
    private timer;
    constructor() { }
    ngAfterViewInit() {
        this.startTime = Date.now();
        this.endDate = 3600000;
        this.endDate += this.startTime;
        this.timer = setInterval(() => {
        this.diff = this.endDate - Date.now();
        }, 1000);
    }

    ngOnDestroy() {
        if (this.timer) {
        clearInterval(this.timer);
        }
    }
}
