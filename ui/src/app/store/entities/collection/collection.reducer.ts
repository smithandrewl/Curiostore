import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';

import {
  CollectionActions,
  CollectionActionTypes
} from './collection.actions';
import {Collection} from '../../../shared/models/models';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ApplicationState} from '../../reducers';

export interface CollectionState extends EntityState<Collection> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Collection> = createEntityAdapter<Collection>();

export const initialState: CollectionState = adapter.getInitialState({
  // additional entity state properties

});

export function reducer(
  state = initialState,
  action: CollectionActions
): CollectionState {
  switch (action.type) {
    case CollectionActionTypes.AddCollection: {
      return adapter.addOne(action.payload.collection, state);
    }

    case CollectionActionTypes.UpsertCollection: {
      return adapter.upsertOne(action.payload.collection, state);
    }

    case CollectionActionTypes.AddCollections: {
      return adapter.addMany(action.payload.collections, state);
    }

    case CollectionActionTypes.UpsertCollections: {
      return adapter.upsertMany(action.payload.collections, state);
    }

    case CollectionActionTypes.UpdateCollection: {
      return adapter.updateOne(action.payload.collection, state);
    }

    case CollectionActionTypes.UpdateCollections: {
      return adapter.updateMany(action.payload.collections, state);
    }

    case CollectionActionTypes.DeleteCollection: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CollectionActionTypes.DeleteCollections: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CollectionActionTypes.LoadCollections: {
      return adapter.addAll(action.payload.collections, state);
    }

    case CollectionActionTypes.ClearCollections: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getCollectionStore = createSelector((state: ApplicationState) => state.collections);

