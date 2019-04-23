import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {CollectionsFacadeService} from '../../shared/facades/collections-facade.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [Location, {provide: LocationStrategy,  useClass: PathLocationStrategy}]
})
export class AddComponent implements OnInit {

  constructor(private _location: Location, public collections: CollectionsFacadeService) { }

  public cancel() {
    this._location.back();
  }

  ngOnInit() {
  }
}
