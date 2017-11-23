import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { LoginAuthGuard } from './services/login-auth-guard.service';
import { GlobalAuthGuard } from './services/global-auth-guard.service';

import { TimePipe } from './pipes/time.pipe';
import { CensorshipPipe } from './pipes/censorship.pipe';

import { MasterConfigService } from './services/master-config.service';
import { BgConfigService } from './services/bg-config.service';
import { UserResolver } from './services/user-resolver.service';
import { HttpService } from '../api/http.service';
import { AuthService } from '../api/auth.service';
import { AdviceService } from '../api/advice.service';
import { MatchService } from '../api/match.service';
import { CommentService } from '../api/comment.service';
import { UserService } from '../api/user.service';
import { FieldService } from '../api/field.service';
import { LogService } from '../api/log.service';
import { TeamService } from '../api/team.service';
import { ColorService } from '../api/color.service';

import { CounterDirective } from './directives/counter.directive';

import { AppComponent } from './app.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { IndexComponent } from './components/index/index.component';
import { MasterComponent } from './components/master/master.component';
import { BackgroundComponent } from './components/background/background.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdviceComponent } from './components/advice/advice.component';
import { AboutComponent } from './components/about/about.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    FourOFourComponent,
    IndexComponent,
    MasterComponent,
    BackgroundComponent,
    LoginComponent,
    SignupComponent,
    AdviceComponent,
    AboutComponent,
    TimePipe,
    CensorshipPipe,
    CounterDirective,
    UserComponent
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
    BgConfigService,
    UserResolver,
    LoginAuthGuard,
    GlobalAuthGuard,
    HttpService,
    AuthService,
    AdviceService,
    MatchService,
    CommentService,
    UserService,
    FieldService,
    LogService,
    TeamService,
    ColorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    authService: AuthService,
    masterConfigService: MasterConfigService
  ) {
    // get auth data
    authService.auth(
      (data) => {
        if (data.result) {
          authService.hasLoggedIn = true;
          authService.user = data.data;
          masterConfigService.setConfig({
            loggedIn: true
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
