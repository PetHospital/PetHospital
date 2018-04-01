import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicalRecord } from './../model/model';
import * as _ from "lodash";
import { BigPicComponent } from '../roleplay/big-pic/big-pic.component';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss']
})
export class MedicalRecordComponent implements OnInit {
  @ViewChild(BigPicComponent)
  bigPic: BigPicComponent;
  pictures: Array<string>;
  coverPic: string;
  constructor() {
    this.pictures = [
    "../../assets/images/cat2.jpg",
    "../../assets/images/cat1.jpg"
    ]; 
    this.coverPic = this.pictures[0];    
  }
  
  nodes = [
    {
      name: '传染病',
      id: 0,
      children: [
        { name: '犬瘟热', id: 0 },
        { name: '犬细小病毒', id: 1 },
        { name: '犬传染性肝炎', id: 2}
      ],
      isExpanded: false
    },
    {
      name: '寄生虫病',
      id: 1,
      children: [
        { name: '蛔虫病', id: 0},
        { name: '钩虫病', id: 1 }
      ],
      isExpanded: false
    },
    { name: '内科' ,
      id: 2,
      children: [
        { name: '口炎', id: 0 },
        { name: '肠炎', id: 1 }
    ],
    isExpanded: false
    }
  ];

  currentRecord: MedicalRecord;

  showDetail = (parent, child) => {
    console.log(parent, child);
    this.currentRecord = child;
  }

  onShowPic() {
    this.bigPic.showPic();
  }

  ngOnInit() {
    this.currentRecord = {
      name: null,
      id: null,
      children: null,
      isExpanded: null
    };
  }

}
