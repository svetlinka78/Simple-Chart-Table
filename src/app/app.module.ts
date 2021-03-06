import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import {ContenteditableModelDirective} from './textedtor/texteditor.directive'
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContenteditableModelDirective,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
