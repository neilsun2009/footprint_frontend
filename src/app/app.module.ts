import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { IndexComponent } from './components/index/index.component';
import { MasterComponent } from './components/master/master.component';


@NgModule({
  declarations: [
    AppComponent,
    FourOFourComponent,
    IndexComponent,
    MasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
