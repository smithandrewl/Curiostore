import { Component, OnInit } from '@angular/core';
import {Location, HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {CollectionsService} from '../../../shared/services/collections.service';
import {ApplicationState} from '../../../store/reducers';
import {Store} from '@ngrx/store';
import {AddCollection} from '../../../store/entities/collection/collection.actions';
import {Collection} from '../../../shared/models/models';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css'],
  providers: [Location, {provide: LocationStrategy,  useClass: PathLocationStrategy}]
})
export class AddCollectionComponent implements OnInit {

  addCollectionForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private _location: Location, private collections: CollectionsService, private store: Store<ApplicationState>) { }

  ngOnInit() {  }

  public cancel() {
    this._location.back();
  }

  save() {

    const name = this.addCollectionForm.get('name').value;
    const description = this.addCollectionForm.get('description').value;


    this.collections.createCollection('Rue Bob', name, description).subscribe(
      () => {
        this.store.dispatch(new AddCollection({collection: new Collection(Math.random(),name, description)}));
      }
    );
  }
}
