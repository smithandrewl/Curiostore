import { BrowserModule    } from '@angular/platform-browser';
import { NgModule         } from '@angular/core';
import { FormsModule      } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent         } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent       } from './login/login.component';

import { PortalComponent      } from './portal/portal.component';
import { AddComponent         } from './portal/add/add.component';
import { CollectionsComponent } from './portal/collections/collections.component';
import { LookupComponent      } from './portal/lookup/lookup.component';
import { CollectionComponent  } from './portal/collections/collection/collection.component';
import { ItemComponent        } from './portal/collections/collection/item/item.component';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
<<<<<<< HEAD
import { ItemComponent } from './portal/collections/collection/item/item.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
=======
>>>>>>> 9f10ad6252163746694051f6350abf70b884b69e

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppEffects } from './store/effects/app.effects';
import { AuthEffects } from './store/effects/auth.effects';

const appRoutes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'portal',
    component: PortalComponent,
    children: [
      {
        path:       '',
        redirectTo: 'collections',
        pathMatch:  'full'
      },
      {
        path:      'add',
        component: AddComponent
      },
      {
        path:      'collections',
        component: CollectionsComponent
      },
      {
        path:      'collections/:id',
        component: CollectionComponent
      },
      {
        path:      'lookup',
        component: LookupComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortalComponent,
    AddComponent,
    CollectionsComponent,
    LookupComponent,
    CollectionComponent,
    ItemComponent
  ],
  imports: [
    LoggerModule.forRoot(
      {
        level: NgxLoggerLevel.DEBUG
      }
    ),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BrowserModule,
<<<<<<< HEAD
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects])
=======
    StoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects, AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
>>>>>>> 9f10ad6252163746694051f6350abf70b884b69e
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
