import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PageAlertMessage, PageAlertType} from '../../components/page-alert/page-alert.component';

@Component({
  selector: 'app-components-demo',
  templateUrl: './components-demo.component.html',
  styleUrls: ['./components-demo.component.css']
})
export class ComponentsDemoComponent implements OnInit {
  active: BehaviorSubject<boolean> = new BehaviorSubject(false);
  message: BehaviorSubject<PageAlertMessage | null> = new BehaviorSubject(null);

  messages: BehaviorSubject<PageAlertMessage | null> =new BehaviorSubject(null);

  constructor() {
  }

  ngOnInit() {
  }

  toggleSpinner() {
    this.active.next(!this.active.value);
  }

  successAlert() {
    this.message.next(
      {
        message: 'Success Body!',
        title: 'Success Title!',
        type: PageAlertType.Success
      }
    );
  }

  warningAlert() {
    this.message.next(
      {
        message: 'Warning Body!',
        title: 'Warning Title!',
        type: PageAlertType.Warning
      }
    );
  }

  errorAlert() {
    this.message.next(
      {
        message: 'Error Body!',
        title: 'Error Title!',
        type: PageAlertType.Error
      }
    );
  }

  infoAlert() {
    this.message.next(
      {
        message: 'Info Body!',
        title: 'Info Title!',
        type: PageAlertType.Info
      }
    );
  }


  successAlerts() {
    this.messages.next(
      {
        message: ['Success 1', 'Success 2', 'Success 3'],
        title: 'Success Title!',
        type: PageAlertType.Success
      }
    );
  }

  warningAlerts() {
    this.messages.next(
      {
        message: ['Warning 1', 'Warning 2', 'Warning 3'],
        title: 'Warning Title!',
        type: PageAlertType.Warning
      }
    );
  }

  errorAlerts() {
    this.messages.next(
      {
        message: ['Error 1', 'Error 2', 'Error 3'],
        title: 'Error Title!',
        type: PageAlertType.Error
      }
    );
  }

  infoAlerts() {
    this.messages.next(
      {
        message: ['Info 1', 'Info 2', 'Info 3'],
        title: 'Info Title!',
        type: PageAlertType.Info
      }
    );
  }

  resetAlert() {
    this.message.next(null);
  }

  resetAlerts(){
    this.messages.next(null);
  }
}
