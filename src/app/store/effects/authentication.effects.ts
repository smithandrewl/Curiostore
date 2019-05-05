import { Injectable } from '@angular/core';
import {concatMap, switchMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';

import {
  AuthenticationActionTypes,
  AuthenticationActions, AuthenticationFailed
} from '../actions/authentication.actions';

@Injectable()
export class AuthenticationEffects {


  @Effect()
  authenticationAttempt$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.AuthenticationAttempt),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    switchMap(() => of(new AuthenticationFailed()))
  );


  constructor(private actions$: Actions<AuthenticationActions>) { }

}
