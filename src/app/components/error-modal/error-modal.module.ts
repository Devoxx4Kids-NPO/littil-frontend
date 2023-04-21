import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorModalComponent } from './error-modal.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [ErrorModalComponent],
  imports: [CommonModule, MatDialogModule, ButtonModule],
  exports: [ErrorModalComponent],
  entryComponents: [ErrorModalComponent],
})
export class ErrorModalModule {}
