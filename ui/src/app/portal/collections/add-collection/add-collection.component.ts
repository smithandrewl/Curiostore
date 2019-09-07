import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';

import {Store} from '@ngrx/store';
import {BehaviorSubject, Observable} from 'rxjs';
import {PageAlertMessage, PageAlertType} from '../../../components/page-alert/page-alert.component';
import {Collection} from '../../../shared/models/models';
import {CollectionsService} from '../../../shared/services/collections.service';
import {AddCollection} from '../../../store/entities/collection/collection.actions';

import {ApplicationState} from '../../../store/reducers';

@Component({
  selector:    'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls:   ['./add-collection.component.css'],
  providers:   [
    Location,
    {
      provide:  LocationStrategy,
      useClass: PathLocationStrategy
    }
  ]
})
export class AddCollectionComponent implements OnInit {

  addCollectionForm:  FormGroup;
  nameControl:        FormControl;
  descriptionControl: FormControl;

  alerts: BehaviorSubject<PageAlertMessage>;
  alert$: Observable<PageAlertMessage>;

  constructor(
    private _location:   Location,
    private collections: CollectionsService,
    private store:       Store<ApplicationState>
  ) {

  }

  ngOnInit() {
    this.alerts = new BehaviorSubject(null);
    this.alert$ = this.alerts.asObservable();

    this.nameControl        = new FormControl('');
    this.descriptionControl = new FormControl('');

    this.addCollectionForm = new FormGroup({
      name:        this.nameControl,
      description: this.descriptionControl
    });
  }

  public cancel() {
    this._location.back();
  }

  save() {
    if(this.addCollectionForm.valid) {
      this.alerts.next(null);
      const name        = this.addCollectionForm.get('name').value;
      const description = this.addCollectionForm.get('description').value;


      this.collections.createCollection('Rue Bob', name, description).subscribe(
        () => {
          this.store.dispatch(
            new AddCollection(
              {
                collection: new Collection(
                  Math.random(),
                  name, description
                )
              }
            )
          );
        }
      );
    } else {


      let messages = [];


      if(this.descriptionControl.errors) {
        messages.push('Description is required');
      }

      if(this.nameControl.errors) {
        messages.push('Name is required');
      }

      this.alerts.next(<PageAlertMessage>{
        type: PageAlertType.Error,
       title: 'Error',
       message: messages
      });

    }
  }
}
