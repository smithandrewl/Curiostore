import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CollectionItem } from './collection-item.model';
import { CollectionItemActions, CollectionItemActionTypes } from './collection-item.actions';

export interface State extends EntityState<CollectionItem> {
  // additional entities state properties
}

export const adapter: EntityAdapter<CollectionItem> = createEntityAdapter<CollectionItem>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: CollectionItemActions
): State {
  switch (action.type) {
    case CollectionItemActionTypes.AddCollectionItem: {
      return adapter.addOne(action.payload.collectionItem, state);
    }

    case CollectionItemActionTypes.UpsertCollectionItem: {
      return adapter.upsertOne(action.payload.collectionItem, state);
    }

    case CollectionItemActionTypes.AddCollectionItems: {
      return adapter.addMany(action.payload.collectionItems, state);
    }

    case CollectionItemActionTypes.UpsertCollectionItems: {
      return adapter.upsertMany(action.payload.collectionItems, state);
    }

    case CollectionItemActionTypes.UpdateCollectionItem: {
      return adapter.updateOne(action.payload.collectionItem, state);
    }

    case CollectionItemActionTypes.UpdateCollectionItems: {
      return adapter.updateMany(action.payload.collectionItems, state);
    }

    case CollectionItemActionTypes.DeleteCollectionItem: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CollectionItemActionTypes.DeleteCollectionItems: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CollectionItemActionTypes.LoadCollectionItems: {
      return adapter.addAll(action.payload.collectionItems, state);
    }

    case CollectionItemActionTypes.ClearCollectionItems: {
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
