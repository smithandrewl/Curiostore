import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../shared/models/models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input('item') item: Item
  constructor() { }

  ngOnInit() {
  }

}
