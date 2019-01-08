import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes, Router} from '@angular/router';
import { LoginComponent } from './login/login.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule} from '@angular/forms';
import { PortalComponent } from './portal/portal.component';
import { AddComponent } from './portal/add/add.component';
import { CollectionsComponent } from './portal/collections/collections.component';
import { LookupComponent } from './portal/lookup/lookup.component';
import { CollectionComponent } from './portal/collections/collection/collection.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ItemComponent } from './portal/collections/collection/item/item.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';


const appRoutes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'portal',
    component: PortalComponent,
    children: [
      { path: '', redirectTo: 'collections', pathMatch: 'full'},
      { path: 'add', component: AddComponent},
      { path: 'collections', component: CollectionsComponent},
      { path: 'collections/:id', component: CollectionComponent},
      { path: 'lookup', component: LookupComponent}
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
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
