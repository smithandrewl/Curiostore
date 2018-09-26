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
    CollectionComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
