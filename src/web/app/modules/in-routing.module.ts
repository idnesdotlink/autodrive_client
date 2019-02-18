import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { InstallPage } from '@pages/install'
import { AppBase } from '@components/app-base'
import { HomePage } from '@pages/home'
import { AccountHome, AccountEdit } from '@pages/account'
import { LevelDetail, LevelHome, LevelEdit } from '@pages/levels'
import { MemberDetail, MemberHome, MemberStore } from '@pages/members'
import { Preference } from '@pages/preference'

const routes: Routes = [
  {
    path: '',
    component: AppBase,
    children: [
      {
        path: 'home',
        component: HomePage,
        data: {
          state: 'home'
        }
      },
      {
        path: 'account',
        component: AccountHome,
        data: {
          state: 'account'
        }
      },
      {
        path: 'account/edit',
        component: AccountEdit,
        data: {
          state: 'account'
        }
      },
      {
        path: 'levels/:id',
        component: LevelDetail,
        // canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'levels/:id/edit',
        component: LevelEdit,
        // canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'levels',
        component: LevelHome
      },
      // members start
      {
        path: 'members/store',
        component: MemberStore,
        // canDeactivate: [CanDeactivateGuard]
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
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    // MinimumMaterialModule,
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    // RouterModule,
    // LazyComponent
  ],
  declarations: [
    // LazyComponent,
    // InstallPage
  ]
})
export class InRoutingModule { }
