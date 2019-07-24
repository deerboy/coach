import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopComponent } from './top/top.component';
import { SharedModule } from './shared/shared.module';
import {HotkeyModule} from 'angular2-hotkeys';
import { EditComponent } from './edit/edit.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';


@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    EditComponent,
    QuestionEditorComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HotkeyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
