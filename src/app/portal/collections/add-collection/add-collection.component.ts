import { Component, OnInit } from '@angular/core';
import {Location, HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {CollectionsService} from '../../../shared/services/collections.service';
import {ApplicationState} from '../../../store/reducers';
import {Store} from '@ngrx/store';
import {AddCollection} from '../../../store/entities/collection/collection.actions';
import {Collection} from '../../../shared/models/models';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css'],
  providers: [Location, {provide: LocationStrategy,  useClass: PathLocationStrategy}]
})
export class AddCollectionComponent implements OnInit {

  constructor(private _location: Location, private collections: CollectionsService, private store: Store<ApplicationState>) { }

  ngOnInit() {  }

  public cancel() {
    this._location.back();
  }

  save() {
    this.collections.createCollection('Rue Bob', 'A new Collection', 'A new collection').subscribe(
      () => {
        this.store.dispatch(new AddCollection({collection: new Collection(Math.random(), 'A new Collection', 'A new collection')}));
      }
    );
  }
}
