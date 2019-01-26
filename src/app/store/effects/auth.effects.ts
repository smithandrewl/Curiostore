import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {Action} from 'rxjs/internal/scheduler/Action';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthActions, AuthActionTypes, SetAuths} from '../actions/auth.actions';

import * as authActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,private http: HttpClient) {}

  @Effect()
  loadAuths$: Observable<SetAuths> = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.LoadAuths),
    switchMap(() => {
      return this.http.get<string>('login')
        .pipe(
          map((userName) => {
            return new authActions.SetAuths(userName);
          })
        );
    })
  );

}
