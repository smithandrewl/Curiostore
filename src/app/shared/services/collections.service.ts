import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  readonly BASE_URL = 'http://localhost/api';
  constructor(private httpClient: HttpClient) { }


  getHeaders() {
    const token = localStorage.getItem('accesstoken');

    const headers = {
      headers: new HttpHeaders(
        {
          'Content-Type' : 'application/json; charset=utf-8',
          'Authorization' : `Bearer ${token}`
        }
      )
    };

    return headers;
  }

  getCollections(): Observable<Array<Collection>> {
    return this.httpClient.get(`${ this.BASE_URL }/Rue Bob/collection/`, this.getHeaders()).pipe(
     map(data => {
       return Object.keys(data).map(
         collection => {
           const col = data[collection];

           return {
             id:          col.id,
             name:        col.name,
             description: col.description
           };
        }
      );
     }));
  }

  getCollection(user: string, name: string) {
    return this.httpClient.get<Collection>(`${this.BASE_URL}/${user}/collection/${name}`, this.getHeaders());
  }
}
