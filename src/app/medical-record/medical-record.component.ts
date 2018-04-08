import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicalRecord } from './../model/model';
import * as _ from "lodash";
import { BigPicComponent } from '../roleplay/big-pic/big-pic.component';
import { DataService } from '../shared/service/data.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss']
})
export class MedicalRecordComponent implements OnInit {

  @ViewChild(BigPicComponent)
  bigPic: BigPicComponent;
  coverPic: string;

  diseaseList: object[];

  constructor(private dataService: DataService) {
    this.coverPic = '../../assets/images/medicalRecord/nullrecord.jpeg';
    this.dataService.getDiseases()
                        .subscribe(data => {
                          console.log(data);
                          this.diseaseList = data;
                        });
  }
  

  currentRecord: MedicalRecord;

  showDetail = (parent, child) => {
    this.currentRecord = child;
  }

  onShowPic() {
    this.bigPic.pictures = ["../../assets/images/medicalRecord/nullrecord.jpeg"];
    this.bigPic.pageCount = 0;
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
