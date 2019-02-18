import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
// import {RouterModule} from '@angular/router'
// import {BaseModule} from '@modules/base.module'
import {ComponentsModule} from '@modules/components.module'
import {InRoutingModule} from '@modules/in-routing.module'
import {LazyComponent} from '@components/lazy-component'
// import {MinimumMaterialModule} from '@modules/minimum-material.module'
import { HomePage } from '@pages/home'
import { AppBase } from '@components/app-base'
import { AccountHome, AccountEdit } from '@pages/account'
import { LevelDetail, LevelHome, LevelEdit } from '@pages/levels'
import { MemberDetail, MemberHome, MemberStore } from '@pages/members'
import { Preference } from '@pages/preference'
@NgModule({
  declarations: [
    LazyComponent,
    AppBase,
    // InstallPage,
    HomePage,
    AccountHome, AccountEdit,
    LevelDetail, LevelHome, LevelEdit,
    MemberDetail, MemberHome, MemberStore,
    Preference
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    InRoutingModule,
  ],
  exports: [
  ]
})
export class LoadModule { }
