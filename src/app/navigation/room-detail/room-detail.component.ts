import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../../shared/service/data.service';
import { RoomInfo } from '../../model/model';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit, AfterViewInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dataService: DataService) { }

  room: RoomInfo;
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getSingleRoomInfo(id)
      .subscribe(data => {
        this.room = data;
      });
  }

  ngAfterViewInit() {
    document.getElementById('image').onload = () => {
      let offsetHeight = document.getElementById('image').clientHeight;
      let top = offsetHeight - 60 + 'px';
      document.getElementsByClassName('learn-more')[0].style.top = top;
    };
  }

  learnMore = () => {
  }

}
