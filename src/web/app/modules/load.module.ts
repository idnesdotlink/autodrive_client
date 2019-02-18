import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
// import {RouterModule} from '@angular/router'
// import {BaseModule} from '@modules/base.module'
import {ComponentsModule} from '@modules/components.module'
import {InRoutingModule} from '@modules/in-routing.module'
import {LazyComponent} from '@components/lazy-component'
// import {MinimumMaterialModule} from '@modules/minimum-material.module'
// import {InstallPage} from '@pages/install'
import { HomePage } from '@pages/home'
import { AppBase } from '@components/app-base'
@NgModule({
  declarations: [
    LazyComponent,
    AppBase,
    // InstallPage,
    HomePage
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    // BaseModule,
    // ComponentsModule,
    // RouterModule,
    InRoutingModule,
    // LazyComponent
  ],
  exports: [
    // CommonModule,
    // RouterModule,
    InRoutingModule,
    // LazyComponent
  ]
})
export class LoadModule { }
