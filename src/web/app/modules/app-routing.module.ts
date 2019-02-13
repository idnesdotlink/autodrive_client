import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// guards
import { AuthGuard } from '@guards/auth.guard'
import { CanDeactivateGuard } from '@guards/candeactivate.guard'
import { InstallGuard } from '@guards/install.guard'

// pages
import { AppBase } from '@components/app-base'

import { AccountEdit, AccountHome } from '@pages/account'
import { Preference } from '@pages/preference'
import { Dev } from '@pages/dev'
import { HomePage } from '@pages/home'
import { Intro } from '@pages/intro'
import { LevelHome, LevelDetail, LevelEdit } from '@pages/levels'
import { Login } from '@pages/login'
import { MemberHome, MemberStore, MemberDetail } from '@pages/members'
import { InstallPage } from '@pages/install'

import { ComponentsModule } from '@modules/components.module'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',

  },
  {
    path: 'login',
    component: Login,
    canActivate: [InstallGuard]
  },
  {
    path: 'intro',
    component: Intro
  },
  {
    path: 'install',
    component: InstallPage
  },
  {
    path: 'admin',
    component: AppBase,
    canActivate: [InstallGuard, AuthGuard],
    children: [
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'account',
        component: AccountHome
      },
      {
        path: 'account/edit',
        component: AccountEdit
      },
      {
        path: 'levels/:id',
        component: LevelDetail,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'levels/:id/edit',
        component: LevelEdit,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'levels',
        component: LevelHome
      },
      // members start
      {
        path: 'members/store',
        component: MemberStore,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'members/:id',
        component: MemberDetail
      },
      {
        path: 'members',
        component: MemberHome
      },
      {
        path: 'preference',
        component: Preference
      },
      {
        path: 'dev',
        component: Dev
      }
    ]
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [
    ComponentsModule,
    RouterModule
      .forRoot(
        routes,
        {
          useHash: true
        }
      )
  ],
  declarations: [
    AccountEdit,
    AccountHome,
    AppBase,
    Dev,
    HomePage,
    Intro,
    LevelDetail,
    LevelHome,
    LevelEdit,
    Login,
    MemberDetail,
    MemberHome,
    MemberStore,
    // PosPageComponent,
    Preference,
    InstallPage
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AuthGuard,
    InstallGuard
  ]
})
export class AppRoutingModule { }
