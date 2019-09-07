import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';


export enum PageAlertType {
  Error = 'bg-danger',
  Warning = 'bg-warning',
  Success = 'bg-success',
  Info = 'bg-info'
}

export interface PageAlertMessage {
  title: string;
  message: string | Array<string>;
  type: PageAlertType;
}


@Component({
  selector: 'app-page-alert',
  templateUrl: './page-alert.component.html',
  styleUrls: ['./page-alert.component.css']
})
export class PageAlertComponent implements OnInit {

  @Input('message') message$: Observable<PageAlertMessage>;

  message: PageAlertMessage | null = null;

  constructor() { }

  ngOnInit() {
    this.message$.subscribe((message) => {
      this.message = message;
    });
  }

  getClasses() {
    if(this.message) {
      return `card ${this.message.type}`;
    } else {
      return 'hidden';
    }
  }

  isSingleMessage() {
    return typeof this.message.message === 'string';
  }
}
