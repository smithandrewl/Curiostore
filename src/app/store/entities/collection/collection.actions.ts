import { Action     } from '@ngrx/store';
import { Update     } from '@ngrx/entity';
import { Collection } from './collection.model';

export enum CollectionActionTypes {
  LoadCollections   = '[Collection] Load Collections',
  AddCollection     = '[Collection] Add Collection',
  UpsertCollection  = '[Collection] Upsert Collection',
  AddCollections    = '[Collection] Add Collections',
  UpsertCollections = '[Collection] Upsert Collections',
  UpdateCollection  = '[Collection] Update Collection',
  UpdateCollections = '[Collection] Update Collections',
  DeleteCollection  = '[Collection] Delete Collection',
  DeleteCollections = '[Collection] Delete Collections',
  ClearCollections  = '[Collection] Clear Collections'
}

export class LoadCollections implements Action {
  readonly type = CollectionActionTypes.LoadCollections;

  constructor(public payload: { collections: Collection[] }) { }
}

export class AddCollection implements Action {
  readonly type = CollectionActionTypes.AddCollection;

  constructor(public payload: { collection: Collection }) { }
}

export class UpsertCollection implements Action {
  readonly type = CollectionActionTypes.UpsertCollection;

  constructor(public payload: { collection: Collection }) { }
}

export class AddCollections implements Action {
  readonly type = CollectionActionTypes.AddCollections;

  constructor(public payload: { collections: Collection[] }) { }
}

export class UpsertCollections implements Action {
  readonly type = CollectionActionTypes.UpsertCollections;

  constructor(public payload: { collections: Collection[] }) { }
}

export class UpdateCollection implements Action {
  readonly type = CollectionActionTypes.UpdateCollection;

  constructor(public payload: { collection: Update<Collection> }) { }
}

export class UpdateCollections implements Action {
  readonly type = CollectionActionTypes.UpdateCollections;

  constructor(public payload: { collections: Update<Collection>[] }) { }
}

export class DeleteCollection implements Action {
  readonly type = CollectionActionTypes.DeleteCollection;

  constructor(public payload: { id: string }) { }
}

export class DeleteCollections implements Action {
  readonly type = CollectionActionTypes.DeleteCollections;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearCollections implements Action {
  readonly type = CollectionActionTypes.ClearCollections;
}

export type CollectionActions =
   LoadCollections
 | AddCollection
 | UpsertCollection
 | AddCollections
 | UpsertCollections
 | UpdateCollection
 | UpdateCollections
 | DeleteCollection
 | DeleteCollections
 | ClearCollections;
