import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-components-demo',
  templateUrl: './components-demo.component.html',
  styleUrls: ['./components-demo.component.css']
})
export class ComponentsDemoComponent implements OnInit {
  active: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  ngOnInit() {
  }

  toggleSpinner() {
    this.active.next(!this.active.value);
  }
}
