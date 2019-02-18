import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LazyComponent } from '@components/lazy-component';


const routes: Routes = [
  {
    path: '',
    component: LazyComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule,
    LazyComponent
  ],
  declarations: [
    LazyComponent
  ]
})
export class InRoutingModule { }
