import {Component} from '@angular/core'
import {fadeAnimation} from '@animations/fadeAnimation'
import {trigger, transition, animate, group, style, query} from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  animations: [
    trigger('routerAnimation', [
      transition(
        '* <=> *', [
          query(':leave .login-box',
            [
              style({ transform: 'translateX(100%)' }),
              animate('60s ease-in-out', style({ transform: 'translateX(0%)' }))
            ],
            { optional: true }
          ),
          query(':enter .login-box',
            [
              style({ transform: 'translateX(0%)' }),
              animate('60s ease-in-out', style({ transform: 'translateX(-100%)' }))
            ],
            { optional: true }
          )
        ]
      )
    ])
  ],
  preserveWhitespaces: false,
  // host: {'[@routerAnimation]': 'getRouterOutletState($outlet)'}
})
export class AppRootComponent {
  public getRouterOutletState(outlet) {
    // console.log(outlet)
    // if(outlet)
    // console.log({ar: outlet})

    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
