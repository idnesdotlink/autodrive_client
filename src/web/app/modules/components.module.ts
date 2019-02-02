import {NgModule} from '@angular/core'
import {ThirdPartyModule} from '@modules/third-party.module'
// import {TreeViewerModule} from '../tree-viewer'
// components
import {AppBar} from '@components/app-bar'
import {AppNav} from '@components/app-nav'
import {BoxPadding} from '@components/box-padding'
import {ColorPicker} from '@components/color-picker'
import {ConfirmDialog} from '@components/confirm-dialog'
import {FilterBox} from '@components/filter-box'
import {IconFontList} from '@components/icon-font-list'
import {LogoImage} from '@components/logo-image'
import {LogoLine} from '@components/logo-line'
import {LogoText} from '@components/logo-text'
import {PageBottomSheet} from '@components/page-bottom-sheet'
import {PageStandard} from '@components/page-standard'
import {PageTable} from '@components/page-table'
import {SnackbarNotification} from '@components/snackbar-notification'
import {HomeCard} from '@components/home-card'
import {SvgSvg} from '@components/svg-svg'
import {TreeViewerComponent} from '@components/tree-viewer'

@NgModule({
  imports: [
    ThirdPartyModule,
  ],
  declarations: [
    AppBar,
    AppNav,
    BoxPadding,
    ColorPicker,
    ConfirmDialog,
    FilterBox,
    IconFontList,
    LogoImage,
    LogoLine,
    LogoText,
    PageBottomSheet,
    PageStandard,
    PageTable,
    SnackbarNotification,
    HomeCard,
    SvgSvg,
    TreeViewerComponent
  ],
  exports: [
    ThirdPartyModule,
    // components
    AppBar,
    AppNav,
    BoxPadding,
    ColorPicker,
    ConfirmDialog,
    FilterBox,
    IconFontList,
    LogoImage,
    LogoLine,
    LogoText,
    PageBottomSheet,
    PageStandard,
    PageTable,
    SnackbarNotification,
    HomeCard,
    SvgSvg,
    TreeViewerComponent
  ],
  entryComponents: [
    ConfirmDialog,
    PageBottomSheet,
    SnackbarNotification,
  ]
})
export class ComponentsModule {}
