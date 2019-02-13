import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-nav',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false
})
export class AppNav {
  @Input() navs: any[];
}
