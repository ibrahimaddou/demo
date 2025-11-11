import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CompleteButtonComponent } from './components/complete-button/complete-button.component';

import { userReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    CompleteButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
