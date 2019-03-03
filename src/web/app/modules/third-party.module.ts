import { BaseModule } from '@modules/base.module'
import { MaterialModule } from '@modules/material.module'
import { NgModule } from '@angular/core'

// third party module
import { AngularSplitModule } from 'angular-split'
import { ClipboardModule } from 'ngx-clipboard'

// extra-module
import { NgxChartsModule } from '@extra/chart'
import { AngularResizedEventModule } from '@extra/resize-event'
import { NgxQRCodeModule } from '@extra/qrcode'
import { NgxBarcodeModule } from '@extra/barcode'
import { ColorPickerModule } from '@extra/color-picker'
import { ContextMenuModule } from '@extra/context-menu'
import { InternationalPhoneNumberModule } from '@extra/phone-number'
import { DigitOnlyModule } from '@extra/digit-only'
import { NgxMaskModule } from '@extra/input-mask'
import { NgxCurrencyModule } from '@extra/currency-mask'

@NgModule({
  imports: [
    BaseModule,
    MaterialModule,
    AngularResizedEventModule,
    AngularSplitModule.forRoot(),
    ClipboardModule,
    ColorPickerModule,
    ContextMenuModule.forRoot(),
    DigitOnlyModule,
    NgxBarcodeModule,
    NgxChartsModule,
    NgxQRCodeModule,
    InternationalPhoneNumberModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule
  ],
  exports: [
    BaseModule,
    MaterialModule,
    AngularResizedEventModule,
    AngularSplitModule,
    ClipboardModule,
    ColorPickerModule,
    ContextMenuModule,
    DigitOnlyModule,
    NgxBarcodeModule,
    NgxChartsModule,
    NgxQRCodeModule,
    InternationalPhoneNumberModule,
    NgxMaskModule,
    NgxCurrencyModule
  ]
})
export class ThirdPartyModule { }
