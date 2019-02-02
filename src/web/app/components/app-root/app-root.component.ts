import {Component} from '@angular/core'
import {fadeAnimation} from '@animations/fadeAnimation'

@Component({
  selector: 'app-root',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  animations: [fadeAnimation]
  // host: {'[@fadeAnimation]': ''}
})
export class AppRootComponent {
  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
