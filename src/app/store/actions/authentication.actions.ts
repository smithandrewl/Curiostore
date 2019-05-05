import { Action } from '@ngrx/store';

export enum AuthenticationActionTypes {
  LoadAuthentications = '[Authentication] Load Authentications',
  
  
}

export class LoadAuthentications implements Action {
  readonly type = AuthenticationActionTypes.LoadAuthentications;
}


export type AuthenticationActions = LoadAuthentications;
