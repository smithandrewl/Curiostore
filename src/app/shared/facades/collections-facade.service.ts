import { Injectable } from '@angular/core';
import {adapter} from '../../store/entities/collection/collection.reducer';
import {ApplicationState} from '../../store/reducers';
import {Store} from '@ngrx/store';

import * as fromCollectionsReducer from '../../store/entities/collection/collection.reducer';
import {Collection} from '../../store/entities/collection/collection.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollectionsFacadeService {

  public readonly selectAllCollection$: Observable<Collection[]>;



  constructor(private store: Store<ApplicationState>) {
    this.selectAllCollection$ = store.select(fromCollectionsReducer.selectAll);
  }
}
