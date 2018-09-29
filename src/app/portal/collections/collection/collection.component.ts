import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionsService } from '../../../shared/services/collections.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private collectionService: CollectionsService) { }

  collection: Collection = <Collection>{};
  items: any;

  ngOnInit() {
    const collectionName = this.route.snapshot.params['id'];
    this.collectionService.getCollection('Rue Bob', collectionName).subscribe((collection: any) => {
      this.collection = collection;
    });
  }
}
