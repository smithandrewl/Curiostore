import {Component, OnInit} from '@angular/core';

import {Store } from '@ngrx/store';

import * as fromRoot from './store/reducers';
import {CollectionsFacadeService} from './shared/facades/collections-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store: Store<fromRoot.ApplicationState>, private collections: CollectionsFacadeService) {}

  ngOnInit() {
    this.collections.loadCollections();
  }
}
