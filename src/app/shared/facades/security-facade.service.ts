import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {PageAlertMessage, PageAlertType} from '../../components/page-alert/page-alert.component';
import {AuthenticationAttempt} from '../../store/actions/authentication.actions';
import {ApplicationState} from '../../store/reducers';
import {AuthenticationError, AuthenticationResult, AuthenticationState} from '../../store/reducers/authentication.reducer';

@Injectable({
  providedIn: 'root'
})
export class SecurityFacadeService {

  constructor(private store: Store<ApplicationState>) { }

  loginAlertMessages: Observable<PageAlertMessage | null> = this.store.select((state: ApplicationState) => state.authentication).pipe(
    switchMap((authState: AuthenticationState, index) => {


      switch(authState.result) {
        case AuthenticationResult.NoAttempt:
          return of(null);
        case AuthenticationResult.Failure:
          switch(authState.error) {
            case AuthenticationError.NoError:
              return of(null);
              break;
            case AuthenticationError.InvalidCredentials:
              return of(<PageAlertMessage>{
                title: 'Error',
                type: PageAlertType.Error,
                message: 'Invalid username or password'
              });
          }
          break;
        case AuthenticationResult.Success:
          return of(<PageAlertMessage>{
            title: 'Success',
            type: PageAlertType.Success,
            message: 'Login succeeded'
          });
      }
    })
  );



  login(email: string, password: string) {
    this.store.dispatch(new AuthenticationAttempt());
  }
}
