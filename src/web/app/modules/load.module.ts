import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ComponentsModule } from '@modules/components.module'
import { LoadRoutingModule } from '@modules/load-routing.module'
import { HomePage } from '@pages/home'
import { AppBase } from '@components/app-base'
import { AccountHome, AccountEdit } from '@pages/account'
import { LevelDetail, LevelHome, LevelEdit } from '@pages/levels'
import { MemberDetail, MemberHome, MemberStore } from '@pages/members'
import { Preference } from '@pages/preference'
@NgModule({
  declarations: [
    AppBase,
    HomePage,
    AccountHome, AccountEdit,
    LevelDetail, LevelHome, LevelEdit,
    MemberDetail, MemberHome, MemberStore,
    Preference
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    LoadRoutingModule,
  ],
  exports: [
  ]
})
export class LoadModule { }
