import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { IndexComponent } from './components/index/index.component';
import { MasterComponent } from './components/master/master.component';
import { BackgroundComponent } from './components/background/background.component';

import { MasterConfigService } from './services/master-config.service';

@NgModule({
  declarations: [
    AppComponent,
    FourOFourComponent,
    IndexComponent,
    MasterComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [MasterConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
