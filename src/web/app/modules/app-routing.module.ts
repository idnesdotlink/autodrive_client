import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// guards
import { AuthGuard } from '@guards/auth.guard'
import { CanDeactivateGuard } from '@guards/candeactivate.guard'
import { InstallGuard } from '@guards/install.guard'

// pages
import { Intro } from '@pages/intro'
import { Login } from '@pages/login'
// import { InstallPage } from '@pages/install'

import { BaseModule } from '@modules/base.module'
import { MinComponentsModule } from '@modules/min-components.module'
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'

  },
  {
    path: 'login',
    component: Login,
    canActivate: [InstallGuard],
    data: {
      state: 'login'
    }
  },
  {
    path: 'intro',
    component: Intro
  },
  /* {
    path: 'install',
    component: InstallPage
  }, */
  {
    path: 'admin',

      // ALTERNATIVE 1
      // loadChildren: () => new Promise(function (resolve, reject) {
      //   (require as any).ensure([], function (require: any) {
      //     resolve(require('@modules/load.module')['LoadModule']);
      //   }, function () {
      //     reject({loadChunkError: true });
      //   }, 'lazy');
      // })
    loadChildren: () => new Promise(
      function (resolve, reject) {
        import(
          /* webpackChunkName: "lazy" */
          '@modules/load.module'
        )
          .then(function (module: any) {
            resolve(module['LoadModule'])
          })
          .catch(function (err) {
            reject(err)
          })
      }
    )
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    MinComponentsModule,
    RouterModule
      .forRoot(
        routes,
        {
          useHash: true,
        }
      )
  ],
  declarations: [
    Intro,
    Login,
    // InstallPage
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
