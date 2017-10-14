import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { routes } from './app.router';
import { metaReducers, reducers } from './store';
import { SharedModule } from './shared/shared.module';
import { FeedEffects } from './store/feed/feed.effects';
import { ProfileEffects } from './store/profile/profile.effects';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
    ]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    RouterModule.forRoot(
      routes,
      {
        useHash: true
      }
    ),
    NgbModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
