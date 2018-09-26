import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../../shared/services/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(private collections: CollectionsService) { }

  collectionList: Array<Collection>;

  ngOnInit() {
    this.collections.getCollections().subscribe(collections => {
      this.collectionList = collections;
    });
  }
}
