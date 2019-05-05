import { Injectable } from '@angular/core';
import { concatMap  } from 'rxjs/operators';
import { EMPTY      } from 'rxjs';

import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';

import {
  AuthenticationActionTypes,
  AuthenticationActions
} from '../actions/authentication.actions';

@Injectable()
export class AuthenticationEffects {


  @Effect()
  authenticationAttempt$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.AuthenticationAttempt),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<AuthenticationActions>) { }

}
