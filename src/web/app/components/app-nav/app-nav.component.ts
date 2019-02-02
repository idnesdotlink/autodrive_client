import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-nav',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class AppNav {
  @Input() navs: any[];
}
