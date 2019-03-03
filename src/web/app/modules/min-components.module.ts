import { NgModule } from '@angular/core'
import { BaseModule } from '@modules/base.module'
import { MinimumMaterialModule } from '@modules/minimum-material.module'
// components
import { BoxPadding } from '@components/box-padding'
import { LogoImage } from '@components/logo-image'
import { LogoLine } from '@components/logo-line'
import { LogoText } from '@components/logo-text'
import { PageStandard } from '@components/page-standard'
import { SnackbarNotification } from '@components/snackbar-notification'
import { ScrollPadding } from '@components/scroll-padding'

@NgModule({
  imports: [
    BaseModule,
    MinimumMaterialModule
  ],
  declarations: [
    // components
    BoxPadding,
    LogoImage,
    LogoLine,
    LogoText,
    PageStandard,
    SnackbarNotification,
    ScrollPadding
  ],
  exports: [
    BaseModule,
    MinimumMaterialModule,
    // components
    BoxPadding,
    LogoImage,
    LogoLine,
    LogoText,
    PageStandard,
    SnackbarNotification,
    ScrollPadding
  ],
  entryComponents: [
    SnackbarNotification,
  ],
  providers: [
  ]
})
export class MinComponentsModule { }
