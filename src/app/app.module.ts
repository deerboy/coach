import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopComponent } from './top/top.component';
import { SharedModule } from './shared/shared.module';
import {HotkeyModule} from 'angular2-hotkeys';
import { EditComponent } from './edit/edit.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    EditComponent,
    ReportComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HotkeyModule.forRoot(),
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ReportComponent]
})
export class AppModule { }
