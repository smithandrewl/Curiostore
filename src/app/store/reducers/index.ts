import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';

import * as fromCollectionsReducer from '../entities/collection/collection.reducer';
import {CollectionState} from '../entities/collection/collection.reducer';


export interface ApplicationState {
  collections: CollectionState;
}

export const reducers:     ActionReducerMap<ApplicationState> = {
  collections: fromCollectionsReducer.reducer
};
export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [] : [];
