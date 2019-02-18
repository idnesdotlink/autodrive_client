import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {InRoutingModule} from '@modules/in-routing.module'

@NgModule({
  imports: [
    CommonModule,
    InRoutingModule,
  ],
  exports: [
    CommonModule,
    InRoutingModule,
  ]
})
export class LoadModule { }
