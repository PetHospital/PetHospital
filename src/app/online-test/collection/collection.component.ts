import { Component, OnInit } from '@angular/core';
import { Collection } from '../../model/model';
import { DataService } from './../../shared/service/data.service';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  CollectionList: any[];

  constructor(private dataService: DataService) {
    this.dataService.getCollection()
                        .subscribe(data => this.CollectionList = data);
  }

  ngOnInit() {
  }

  viewSolution(id): void {
    this.CollectionList[id - 1].showSolution = !this.CollectionList[id - 1].showSolution;
  }
}
