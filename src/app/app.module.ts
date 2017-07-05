import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SfmapComponent } from './sfmap/sfmap.component';
import { HttpModule } from '@angular/http';

import { SfmapService } from './sfmap/sfmap.service';
import { NextBusService } from './nextbus/next-bus.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SfmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    CommonModule
  ],
  providers: [SfmapService, NextBusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
