import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTooltipModule, MatListModule, MatMenuModule, MatBottomSheetModule
} from '@angular/material';

import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
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
    MatBottomSheetModule
  ]
})
export class SharedModule { }
