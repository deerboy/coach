import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatTooltipModule,
  MatListModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatDialogModule
} from '@angular/material';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusDirective } from '../directives/auto-focus.directive';

@NgModule({
  declarations: [AutoFocusDirective],
  imports: [CommonModule],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    DragDropModule,
    MatMenuModule,
    MatBottomSheetModule,
    FormsModule,
    ReactiveFormsModule,
    AutoFocusDirective,
    MatDialogModule
  ]
})
export class SharedModule {}
