import {
  Component,
  OnInit
} from '@angular/core';

import { CollectionsFacadeService } from '../../shared/facades/collections-facade.service';

@Component({
  selector:    'app-collections',
  templateUrl: './collections.component.html',
  styleUrls:   ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(private collections: CollectionsFacadeService) { }

  ngOnInit() { }
}
