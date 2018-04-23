import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicalRecord } from './../model/model';
import * as _ from "lodash";
import { BigPicComponent } from '../roleplay/big-pic/big-pic.component';
import { DataService } from '../shared/service/data.service';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss']
})
export class MedicalRecordComponent implements OnInit {

  @ViewChild(BigPicComponent)
  bigPic: BigPicComponent;
  coverPic: string;

  allImages: any;
  allVideos: any;

  diseaseList: object[];

  constructor(private dataService: DataService) {
    this.dataService.getDiseaseVideos().subscribe(videoData => {
      this.allVideos = videoData;
      this.dataService.getDiseaseImages().subscribe(data => {
        this.allImages = data;
        this.dataService.getDiseases()
          .subscribe(diseaseData => {
            let nodes = [];
            for (let parent in diseaseData) {
              let childDiseases = [];
              for (let child in diseaseData[parent]) {
                let childDisease = {
                  name: child,
                  text: diseaseData[parent][child].text,
                  images: this.splitImageUrls(this.allImages[child]) ,
                  video: API_URL + '/media/' + this.allVideos[child]
                };
                childDiseases.push(childDisease);
              }
              let node = {
                name: parent,
                children: childDiseases,
              };
              nodes.push(node);
            }
            this.diseaseList = nodes;
          });
      });
    });

  }


  currentRecord: MedicalRecord;

  showDetail = (parent, child) => {
    this.currentRecord = child;
  }

  splitImageUrls = (images) => {
    if (!images) {
      return ["../../assets/images/medicalRecord/nullrecord.jpeg"];
    }
    if (images.split(',').length === 1) {
      return [API_URL + '/media/' + images];
    }
    let fullUrls = [];
    for (let image of images.split(',')) {
      fullUrls.push(API_URL + '/media/' + image);
    }
    return fullUrls;
  }

  onShowPic(images) {
    this.bigPic.pictures = images;
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
