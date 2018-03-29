import { Component, OnInit } from '@angular/core';
import { Collection } from './collection';
import { CollectionService } from './collection.service';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  CollectionList: Collection[];

  constructor(private collectionService: CollectionService) { }

  ngOnInit() {
    this.getCollectionList();  
  }

  getCollectionList(): void {
    this.CollectionList = this.collectionService.getCollection(); 
  }
}
