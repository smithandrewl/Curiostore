import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../../shared/services/collections.service';
import {Collection} from '../../shared/models/models';
import {CollectionsFacadeService} from '../../shared/facades/collections-facade.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(private collections: CollectionsFacadeService) { }


  ngOnInit() {

  }
}
