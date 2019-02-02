import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {HttpClientModule} from '@angular/common/http'
import {FlexLayoutModule} from '@angular/flex-layout'
import {RouterModule} from '@angular/router'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    HttpClientModule
  ]
})
export class BaseModule { }
