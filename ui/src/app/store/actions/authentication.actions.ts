
import { Action } from '@ngrx/store';

export enum AuthenticationActionTypes {
  AuthenticationAttempt   = '[Authentication] Authenticate',
  AuthenticationFailed    = '[Authentication] Failed',
  AuthenticationSucceeded ='[Authentication] Succeeded',
  AuthenticationLogout  = '[Authentication] Logout'
}

export class AuthenticationAttempt implements Action {

  constructor(public payload: { username: string; password: string }) {

  }

  readonly  type = AuthenticationActionTypes.AuthenticationAttempt;
}

export class AuthenticationFailed implements Action {
  readonly type = AuthenticationActionTypes.AuthenticationFailed;
}

export class AuthenticationSucceeded implements Action {
  readonly type = AuthenticationActionTypes.AuthenticationSucceeded;
}

export class AuthenticationLogout implements Action {
  readonly  type = AuthenticationActionTypes.AuthenticationLogout;

}

export type AuthenticationActions =
    AuthenticationAttempt
  | AuthenticationFailed
  | AuthenticationSucceeded
  | AuthenticationLogout;