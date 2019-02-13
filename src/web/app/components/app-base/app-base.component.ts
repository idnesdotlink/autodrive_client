import {Component, EventEmitter, Output, OnDestroy, Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {SidenavService} from '@services/sidenav.service'
import {navigation} from '@helpers'
import { fadeAnimation } from '@animations/fadeAnimation';
@Component({
  selector: 'app-base',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false,
  providers: [
    SidenavService
  ],
  animations: [
    fadeAnimation
  ]
})
@Injectable()
export class AppBaseComponent {

  appNav: any[];
  private app_title: string;

  events: string[] = [];
  opened: boolean;

  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(private _eventEmiter: SidenavService, public router: Router) {
    this.appNav = navigation(router);
    this.app_title = 'Autodrive';
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ngOnInit() {
    // this._eventEmiter.dataStr.subscribe(data => console.log(data))
  }
}
