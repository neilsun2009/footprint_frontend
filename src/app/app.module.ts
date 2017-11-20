import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { IndexComponent } from './components/index/index.component';
import { MasterComponent } from './components/master/master.component';
import { BackgroundComponent } from './components/background/background.component';
import { LoginComponent } from './components/login/login.component';

import { MasterConfigService } from './services/master-config.service';
import { LoginAuthGuard } from './services/login-auth-guard.service';
import { GlobalAuthGuard } from './services/global-auth-guard.service';
import { HttpService } from '../api/http.service';
import { AuthService } from '../api/auth.service';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    FourOFourComponent,
    IndexComponent,
    MasterComponent,
    BackgroundComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MasterConfigService,
    LoginAuthGuard,
    GlobalAuthGuard,
    HttpService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
