import {Component, EventEmitter, Output, OnDestroy, Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {navigation} from '@helpers'
@Component({
  selector: 'app-base',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false
})
@Injectable()
export class AppBaseComponent {

  appNav: any[];
  app_title: string;

  events: string[] = [];
  opened: boolean;

  constructor(public router: Router) {
    this.appNav = navigation(router);
    this.app_title = 'Autodrive';
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
