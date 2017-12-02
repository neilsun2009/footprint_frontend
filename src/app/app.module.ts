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
import { ScorePipe } from './pipes/score.pipe';

import { MasterConfigService } from './services/master-config.service';
import { BgConfigService } from './services/bg-config.service';
import { UserResolver } from './services/user-resolver.service';
import { MatchResolver } from './services/match-resolver.service';
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
import { WallpaperService } from '../api/wallpaper.service';
import { SofaService } from '../api/sofa.service';

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
import { WallpaperComponent } from './components/wallpaper/wallpaper.component';
import { MatchComponent } from './components/match/match.component';
import { DetailComponent } from './components/detail/detail.component';
import { ForecastComponent } from './components/detail/forecast/forecast.component';
import { CommentComponent } from './components/detail/comment/comment.component';
import { PostmatchComponent } from './components/detail/postmatch/postmatch.component';
import { StarComponent } from './components/detail/star/star.component';
import { FieldComponent } from './components/detail/field/field.component';
import { ReportComponent } from './components/detail/report/report.component';
import { ChatComponent } from './components/detail/chat/chat.component';

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
    ScorePipe,
    CounterDirective,
    UserComponent,
    WallpaperComponent,
    MatchComponent,
    DetailComponent,
    ForecastComponent,
    CommentComponent,
    PostmatchComponent,
    StarComponent,
    FieldComponent,
    ReportComponent,
    ChatComponent
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
    MatchResolver,
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
    ColorService,
    WallpaperService,
    SofaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
