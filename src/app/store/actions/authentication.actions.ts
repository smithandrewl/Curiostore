
import { Action } from '@ngrx/store';

export enum AuthenticationActionTypes {
  AuthenticationAttempt   = '[Authentication] Authenticate',
  AuthenticationFailed    = '[Authentication] Failed',
  AuthenticationSucceeded ='[Authentication] Succeeded'
}

export class AuthenticationAttempt implements Action {
  readonly  type = AuthenticationActionTypes.AuthenticationAttempt;
}

export class AuthenticationFailed implements Action {
  readonly type = AuthenticationActionTypes.AuthenticationFailed;
}

export class AuthenticationSucceeded implements Action {
  readonly type = AuthenticationActionTypes.AuthenticationSucceeded;
}
export type AuthenticationActions =
    AuthenticationAttempt
  | AuthenticationFailed
  | AuthenticationSucceeded;
