import {Component} from '@angular/core'

@Component({
  selector: 'has-overlay',
  template: '<div (click)="click()">Click</div>'
})
export class HasOverlayComponent {
  click() {
    console.log('clicked')
  }
}
