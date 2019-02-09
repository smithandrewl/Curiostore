import { Component, OnInit } from '@angular/core';
import {Location, HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css'],
  providers: [Location, {provide: LocationStrategy,  useClass: PathLocationStrategy}]
})
export class AddCollectionComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {  }

  public cancel() {
    this._location.back();
  }

}
