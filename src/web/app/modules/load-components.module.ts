import { NgModule } from '@angular/core'
import { ThirdPartyModule } from '@modules/third-party.module'
// components
import { AppBar } from '@components/app-bar'
import { AppNav } from '@components/app-nav'
import { BoxPadding } from '@components/box-padding'
import { ColorPicker } from '@components/color-picker'
import { ConfirmDialog } from '@components/confirm-dialog'
import { FilterBox } from '@components/filter-box'
import { IconFontList } from '@components/icon-font-list'
import { LogoImage } from '@components/logo-image'
import { LogoLine } from '@components/logo-line'
import { LogoText } from '@components/logo-text'
import { PageBottomSheet } from '@components/page-bottom-sheet'
import { PageStandard } from '@components/page-standard'
import { SnackbarNotification } from '@components/snackbar-notification'
import { HomeCard } from '@components/home-card'
import { SvgSvg } from '@components/svg-svg'
import { TreeViewer } from '@components/tree-viewer'
import { MemberTable } from '@components/member-table'
import { ChartDonut } from '@components/chart-donut'
import { ChartLine } from '@components/chart-line'
import { ChartBar } from '@components/chart-bar'
import { ChartBarGroup } from '@components/chart-bar-group'
import { HasOverlay, overlayService, ExampleOverlay } from '@components/example-overlay'
import { SplitInput, SplitInputDirective } from '@components/split-input'
import { ScrollPadding } from '@components/scroll-padding'

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
    SnackbarNotification,
    HomeCard,
    SvgSvg,
    TreeViewer,
    MemberTable,
    ChartDonut,
    ChartLine,
    ChartBarGroup,
    ChartBar,
    HasOverlay,
    ExampleOverlay,
    SplitInput,
    SplitInputDirective,
    ScrollPadding
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
    SnackbarNotification,
    HomeCard,
    SvgSvg,
    TreeViewer,
    MemberTable,
    ChartDonut,
    ChartLine,
    ChartBarGroup,
    ChartBar,
    HasOverlay,
    ExampleOverlay,
    SplitInput,
    SplitInputDirective,
    ScrollPadding
  ],
  entryComponents: [
    ConfirmDialog,
    PageBottomSheet,
    SnackbarNotification,
    ExampleOverlay
  ],
  providers: [
    overlayService
  ]
})
export class ComponentsModule { }
