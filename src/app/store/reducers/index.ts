import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';

import * as fromCollectionsReducer    from '../entities/collection/collection.reducer';
import * as fromAuthenticationReducer from '../reducers/authentication.reducer';

import { CollectionState     } from '../entities/collection/collection.reducer';
import { AuthenticationState } from './authentication.reducer';


export interface ApplicationState {
  collections:    CollectionState;
  authentication: AuthenticationState;
}

export const reducers:     ActionReducerMap<ApplicationState> = {
  collections:    fromCollectionsReducer.reducer,
  authentication: fromAuthenticationReducer.reducer
};

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [] : [];
