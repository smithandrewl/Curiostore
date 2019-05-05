import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AuthenticationActionTypes, AuthenticationActions } from '../actions/authentication.actions';


@Injectable()
export class AuthenticationEffects {


  @Effect()
  loadAuthentications$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoadAuthentications),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<AuthenticationActions>) {}

}
