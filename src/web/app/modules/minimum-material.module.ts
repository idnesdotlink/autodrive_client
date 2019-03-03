import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    PortalModule,
    OverlayModule
  ],
  exports: [
    PortalModule,
    OverlayModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ]
})
export class MinimumMaterialModule { }
