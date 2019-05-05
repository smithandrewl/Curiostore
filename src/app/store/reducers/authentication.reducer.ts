import {
  AuthenticationActions,
  AuthenticationActionTypes
} from '../actions/authentication.actions';

export enum AuthenticationResult {
  NoAttempt = 'NoAttempt',
  Success = 'Success',
  Failure = 'Failure'
}

export enum AuthenticationError {
  NoError = 'NoError',
  InvalidCredentials = 'InvalidCredentials'
}

export interface AuthenticationState {
  result: AuthenticationResult;
  error: AuthenticationError;
}

export const initialState: AuthenticationState = {
  result: AuthenticationResult.NoAttempt,
  error: AuthenticationError.NoError
};

export function reducer(state = initialState, action: AuthenticationActions): AuthenticationState {
  switch (action.type) {

    case AuthenticationActionTypes.AuthenticationAttempt:
      return state;
    case AuthenticationActionTypes.AuthenticationSucceeded:
      return {
        ...state,
        error: AuthenticationError.NoError,
        result: AuthenticationResult.Success
      };
    case AuthenticationActionTypes.AuthenticationFailed:
      return {
        ...state,
        error: AuthenticationError.InvalidCredentials,
        result: AuthenticationResult.Failure
      };
    default:
      return state;
  }
}
