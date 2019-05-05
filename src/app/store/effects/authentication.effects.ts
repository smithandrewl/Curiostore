import { Injectable } from '@angular/core';
import {catchError, concatMap, switchMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import {SecurityService} from '../../shared/services/security.service';

import {
  AuthenticationActionTypes,
  AuthenticationActions, AuthenticationFailed, AuthenticationSucceeded
} from '../actions/authentication.actions';

@Injectable()
export class AuthenticationEffects {


  @Effect()
  authenticationAttempt$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.AuthenticationAttempt),

    switchMap((value, index) => {
      return this.security.login(value.payload.username, value.payload.password).pipe(
        catchError((err, caught) => of(new AuthenticationFailed())),
        switchMap((data: any) => {
          if(data.type === AuthenticationActionTypes.AuthenticationFailed) {
            return of(data);
          }
          console.log(JSON.stringify(data, null, 2));
          return of(new AuthenticationSucceeded());
        })
      );
    })
  );


  constructor(private actions$: Actions<AuthenticationActions>, private security: SecurityService) { }

}
