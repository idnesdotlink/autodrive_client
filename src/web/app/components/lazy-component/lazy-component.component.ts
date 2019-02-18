import {Component} from '@angular/core'
@Component({
  selector: 'lazy-component',
  template: '<div>[LAZY]</div>',
  preserveWhitespaces: false
})
export class LazyComponentComponent { }
