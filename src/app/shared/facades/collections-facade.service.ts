import { Injectable } from '@angular/core';
import {adapter} from '../../store/entities/collection/collection.reducer';
import {ApplicationState} from '../../store/reducers';
import {createSelector, Store} from '@ngrx/store';

import * as fromCollectionsReducer from '../../store/entities/collection/collection.reducer';
import {Observable} from 'rxjs';
import {LoadCollections} from '../../store/entities/collection/collection.actions';
import {CollectionsService} from '../services/collections.service';
import {Collection} from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class CollectionsFacadeService {

  public readonly selectAllCollection$: Observable<Collection[]>;



  constructor(private store: Store<ApplicationState>, private collections: CollectionsService) {
    this.selectAllCollection$ = this.store.select( createSelector((state) => state.collections, fromCollectionsReducer.selectAll));
  }

  public loadCollections() {
    this.collections.getCollections().subscribe((collections) => {
      this.store.dispatch(new LoadCollections({collections: collections}));
    });
  }
}
