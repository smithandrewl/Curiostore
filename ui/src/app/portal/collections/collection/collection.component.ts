import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionsService } from '../../../shared/services/collections.service';
import {Collection, CollectionItem} from '../../../shared/models/models';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private collectionService: CollectionsService) { }

  collection: Collection = <Collection>{};
  items: Array<CollectionItem>;

  ngOnInit() {
    const collectionName = this.route.snapshot.params['id'];
    this.collectionService.getCollection('Rue Bob', collectionName).subscribe((collection: any) => {
      this.collection = collection;

      this.collectionService.getCollectionItems('Rue Bob', collectionName).subscribe( (items: any) => {
        this.items = items;
      });
    });
  }
}
