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

import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddCollectionComponent } from './portal/collections/add-collection/add-collection.component';
import { ProfileSettingsComponent } from './portal/profile-settings/profile-settings.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
        path: 'profile',
        component: ProfileSettingsComponent
      },
      {
        path:      'add',
        component: AddComponent
      },

          {
            path: 'newCollection',
            component: AddCollectionComponent
          },
      {
        path: 'collections',
        component: CollectionsComponent,
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
    ItemComponent,
    AddCollectionComponent,
    ProfileSettingsComponent
  ],
  imports: [
    LoggerModule.forRoot(
      {
        level: NgxLoggerLevel.DEBUG
      }
    ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
