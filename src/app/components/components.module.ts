import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { PageAlertComponent } from './page-alert/page-alert.component';

@NgModule({
  declarations: [SpinnerComponent, PageAlertComponent],
  imports: [
    CommonModule
  ],
  exports:  [
    SpinnerComponent
  ]
})
export class ComponentsModule { }
