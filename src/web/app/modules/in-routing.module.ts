import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { MinimumMaterialModule } from '@modules/minimum-material.module'
import { LazyComponent } from '@components/lazy-component';
// import { InstallPage } from '@pages/install'
import { AppBase } from '@components/app-base'
import { HomePage } from '@pages/home'

const routes: Routes = [
  {
    path: '',
    component: AppBase,
    children: [
      {
        path: 'home',
        // component: InstallPage,
        component: HomePage,
      },
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
