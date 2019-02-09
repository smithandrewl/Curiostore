import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [Location, {provide: LocationStrategy,  useClass: PathLocationStrategy}]
})
export class AddComponent implements OnInit {

  constructor(private _location: Location) { }

  public cancel() {
    this._location.back();
  }

  ngOnInit() {
  }
}
