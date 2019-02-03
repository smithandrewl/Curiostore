import { Action } from '@ngrx/store';

export enum CounterActionTypes {
  IncCounter = '[Counter] Inc Counter',
  DecCounter = '[Counter] Dec Counter'
}



export class IncCounter implements Action {
  readonly type = CounterActionTypes.IncCounter;
}

export class DecCounter implements Action {
  readonly type = CounterActionTypes.DecCounter;
}

