import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes, Router} from '@angular/router';
import { LoginComponent } from './login/login.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule} from '@angular/forms';
import { PortalComponent } from './portal/portal.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


const appRoutes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'portal', component: PortalComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortalComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:9988'],
        blacklistedRoutes: ['localhost:9988/login/']
      }
    }),
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
