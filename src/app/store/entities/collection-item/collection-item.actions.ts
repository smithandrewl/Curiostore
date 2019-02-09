import { Action         } from '@ngrx/store';
import { Update         } from '@ngrx/entity';
import { CollectionItem } from './collection-item.model';

export enum CollectionItemActionTypes {
  LoadCollectionItems   = '[CollectionItem] Load CollectionItems',
  AddCollectionItem     = '[CollectionItem] Add CollectionItem',
  UpsertCollectionItem  = '[CollectionItem] Upsert CollectionItem',
  AddCollectionItems    = '[CollectionItem] Add CollectionItems',
  UpsertCollectionItems = '[CollectionItem] Upsert CollectionItems',
  UpdateCollectionItem  = '[CollectionItem] Update CollectionItem',
  UpdateCollectionItems = '[CollectionItem] Update CollectionItems',
  DeleteCollectionItem  = '[CollectionItem] Delete CollectionItem',
  DeleteCollectionItems = '[CollectionItem] Delete CollectionItems',
  ClearCollectionItems  = '[CollectionItem] Clear CollectionItems'
}

export class LoadCollectionItems implements Action {
  readonly type = CollectionItemActionTypes.LoadCollectionItems;

  constructor(public payload: { collectionItems: CollectionItem[] }) { }
}

export class AddCollectionItem implements Action {
  readonly type = CollectionItemActionTypes.AddCollectionItem;

  constructor(public payload: { collectionItem: CollectionItem }) { }
}

export class UpsertCollectionItem implements Action {
  readonly type = CollectionItemActionTypes.UpsertCollectionItem;

  constructor(public payload: { collectionItem: CollectionItem }) { }
}

export class AddCollectionItems implements Action {
  readonly type = CollectionItemActionTypes.AddCollectionItems;

  constructor(public payload: { collectionItems: CollectionItem[] }) { }
}

export class UpsertCollectionItems implements Action {
  readonly type = CollectionItemActionTypes.UpsertCollectionItems;

  constructor(public payload: { collectionItems: CollectionItem[] }) { }
}

export class UpdateCollectionItem implements Action {
  readonly type = CollectionItemActionTypes.UpdateCollectionItem;

  constructor(public payload: { collectionItem: Update<CollectionItem> }) { }
}

export class UpdateCollectionItems implements Action {
  readonly type = CollectionItemActionTypes.UpdateCollectionItems;

  constructor(public payload: { collectionItems: Update<CollectionItem>[] }) { }
}

export class DeleteCollectionItem implements Action {
  readonly type = CollectionItemActionTypes.DeleteCollectionItem;

  constructor(public payload: { id: string }) { }
}

export class DeleteCollectionItems implements Action {
  readonly type = CollectionItemActionTypes.DeleteCollectionItems;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearCollectionItems implements Action {
  readonly type = CollectionItemActionTypes.ClearCollectionItems;
}

export type CollectionItemActions =
   LoadCollectionItems
 | AddCollectionItem
 | UpsertCollectionItem
 | AddCollectionItems
 | UpsertCollectionItems
 | UpdateCollectionItem
 | UpdateCollectionItems
 | DeleteCollectionItem
 | DeleteCollectionItems
 | ClearCollectionItems;
