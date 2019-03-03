import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard'
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
        canActivate: [AuthGuard],
        data: {
          state: 'home'
        }
      },
      {
        path: 'account',
        component: AccountHome,
        canActivate: [AuthGuard],
        data: {
          state: 'account'
        }
      },
      {
        path: 'account/edit',
        component: AccountEdit,
        canActivate: [AuthGuard],
        data: {
          state: 'account'
        }
      },
      {
        path: 'levels/:id',
        component: LevelDetail,
        canActivate: [AuthGuard],
        // canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'levels/:id/edit',
        component: LevelEdit,
        canActivate: [AuthGuard],
        // canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'levels',
        canActivate: [AuthGuard],
        component: LevelHome
      },
      // members start
      {
        path: 'members/store',
        component: MemberStore,
        canActivate: [AuthGuard],
        // canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'members/:id',
        canActivate: [AuthGuard],
        component: MemberDetail
      },
      {
        path: 'members',
        canActivate: [AuthGuard],
        component: MemberHome
      },
      {
        path: 'preference',
        canActivate: [AuthGuard],
        component: Preference
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ]
})
export class LoadRoutingModule { }
