import {AuthenticationActions, AuthenticationActionTypes} from '../actions/authentication.actions';

export interface AuthenticationState {

}

export const initialState: AuthenticationState = {

};

export function reducer(state = initialState, action: AuthenticationActions): AuthenticationState {
  switch (action.type) {

    case AuthenticationActionTypes.AuthenticationAttempt:
      return state;
    case AuthenticationActionTypes.AuthenticationSucceeded:
      return state;
    case AuthenticationActionTypes.AuthenticationFailed:
      return state;
    default:
      return state;
  }
}
