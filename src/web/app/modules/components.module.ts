import { NgModule } from '@angular/core'
import { ThirdPartyModule } from '@modules/third-party.module'
// components
import { MinComponentsModule } from '@modules/min-components.module'
import { AppBar } from '@components/app-bar'
import { AppNav } from '@components/app-nav'
import { ColorPicker } from '@components/color-picker'
import { ConfirmDialog } from '@components/confirm-dialog'
import { FilterBox } from '@components/filter-box'
import { IconFontList } from '@components/icon-font-list'
import { PageBottomSheet } from '@components/page-bottom-sheet'
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
import { MemberSearch } from '@components/member-search'

@NgModule({
  imports: [
    ThirdPartyModule,
    MinComponentsModule
  ],
  declarations: [
    AppBar,
    AppNav,
    // BoxPadding,
    ColorPicker,
    ConfirmDialog,
    FilterBox,
    IconFontList,
    // LogoImage,
    // LogoLine,
    // LogoText,
    PageBottomSheet,
    // PageStandard,
    // SnackbarNotification,
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
    MemberSearch,
    // ScrollPadding
  ],
  exports: [
    ThirdPartyModule,
    MinComponentsModule,
    // components
    AppBar,
    AppNav,
    // BoxPadding,
    ColorPicker,
    ConfirmDialog,
    FilterBox,
    IconFontList,
    // LogoImage,
    // LogoLine,
    // LogoText,
    PageBottomSheet,
    // PageStandard,
    // SnackbarNotification,
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
    MemberSearch,
    // ScrollPadding
  ],
  entryComponents: [
    ConfirmDialog,
    PageBottomSheet,
    // SnackbarNotification,
    ExampleOverlay
  ],
  providers: [
    overlayService
  ]
})
export class ComponentsModule { }
