import { Component } from '@angular/core';

import {Store } from '@ngrx/store';

import * as fromRoot from './store/reducers';
import * as authActions from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private store: Store<fromRoot.State>) {}
}
