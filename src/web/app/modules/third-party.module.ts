import {BaseModule} from '@modules/base.module'
import {MaterialModule} from '@modules/material.module'
import {NgModule} from '@angular/core'

// third party module
import {AngularResizedEventModule} from 'angular-resize-event'
import {AngularSplitModule} from 'angular-split'
import {ClipboardModule} from 'ngx-clipboard'
import {ColorPickerModule} from 'ngx-color-picker'
import {ContextMenuModule} from 'ngx-contextmenu'
import {DigitOnlyModule} from '@uiowa/digit-only'
import {NgxBarcodeModule} from 'ngx-barcode'
import {NgxChartsModule} from '@swimlane/ngx-charts'
import {QRCodeModule} from 'angularx-qrcode'
import {InternationalPhoneNumberModule} from '@extra/phone/phone-number.module'

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
    QRCodeModule,
    InternationalPhoneNumberModule
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
    QRCodeModule,
    InternationalPhoneNumberModule
  ]
})
export class ThirdPartyModule {}
