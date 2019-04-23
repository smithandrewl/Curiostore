import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map        } from 'rxjs/operators';
import { NGXLogger  } from 'ngx-logger';

import { Collection, CollectionItem        } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  readonly BASE_URL = 'http://localhost/api';
  constructor(private httpClient: HttpClient, private logger: NGXLogger) { }

  /**
   * Returns http headers containing a content-type and bearer token for making calls.
   */
  getHeaders() {
    this.logger.debug('CollectionService.getHeaders():');

    const token = localStorage.getItem('accesstoken');

    const headersBody =         {
      'Content-Type':  'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`
    };

    this.logger.debug(`Headers = ${JSON.stringify(headersBody, null, 2)}`);

    const headers = {
      headers: new HttpHeaders(
        headersBody
      )
    };

    return headers;
  }

  /**
   * Returns all collections.
   */
  getCollections(): Observable<Array<Collection>> {
    this.logger.debug('CollectionService.getCollections():');

    this.logger.debug(`Calling ${this.logger}/Rue Bob/collection/`);

    return this.httpClient.get(`${ this.BASE_URL }/Rue Bob/collection/`, this.getHeaders()).pipe(
     map(data => {

      this.logger.debug('Server replied with:');
      this.logger.debug(`${JSON.stringify(data, null, 2)}`);

      const transformed = Object.keys(data).map(
         collection => {
           const col = data[collection];

           return new Collection(
             +col.id,
             col.name,
             col.description
           );

        }
      );

      this.logger.debug('Transformed server data into:');
      this.logger.debug(JSON.stringify(transformed, null, 2));

      return transformed;
     }));
  }

  /**
   * Gets information about a specific users collection.
   *
   * @param user The user the collection belongs too.
   * @param name The name of the collection.
   */
  getCollection(user: string, name: string) {
    this.logger.debug('CollectionService.getCollection');
    this.logger.debug(`Calling ${this.BASE_URL}/${user}/collection/${name}`);
    return this.httpClient.get<Collection>(`${this.BASE_URL}/${user}/collection/${name}`, this.getHeaders());
  }

  getCollectionItems(user: string, name: string) {
    return this.httpClient.get(`${this.BASE_URL}/${user}/collection/${name}/items/all`, this.getHeaders()).pipe(
      map(
        (result: { data: Array<any>}) => {
          return result.data.map((item) => {
            return new CollectionItem(item.id, item.name, item.description);
          });
        }));
  }
}
