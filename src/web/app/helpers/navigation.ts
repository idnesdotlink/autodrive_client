import {Router} from '@angular/router'
import screenfull from 'screenfull'

interface navigationList {
  backgroundColor?: string;
  click?: Function;
  color?: string;
  icon: string | Function;
  routerLink?: string;
  tooltip: string;
}

const navigation = function (router: any): navigationList[] {
  let isFullScreen = (screenfull && screenfull.isFullscreen);
  let fsIcon = (isFullScreen) ? 'zoom_out_map' : 'stars'
  return [
    {
      tooltip: 'Dashboard',
      icon: 'dashboard',
      routerLink: '/admin/home'
    },
    {
      tooltip: 'Sales',
      icon: 'local_grocery_store',
      routerLink: '/admin/pos'
    },
    {
      tooltip: 'Levels',
      icon: 'grade',
      routerLink: '/admin/levels'
    },
    {
      tooltip: 'Members',
      icon: 'face',
      routerLink: '/admin/members'
    },
    {
      tooltip: 'Preference',
      icon: 'tune',
      routerLink: '/admin/preference'
    },
    {
      tooltip: 'development',
      icon: 'build',
      routerLink: '/admin/dev'
    },
    {
      tooltip: 'tree',
      icon: 'build',
      routerLink: '/admin/tree'
    },
    {
      tooltip: 'Full Screen',
      icon: () => {
        return (screenfull && screenfull.isFullscreen) ? 'fullscreen_exit' : 'fullscreen';
      },
      click: () => {
        if (screenfull && screenfull.enabled) {
          console.log(screenfull.isFullscreen);
          try {
            console.log('a')
            screenfull && screenfull.toggle();
          } catch (e) {
            console.log(e);
          }
        }
      },
      backgroundColor: 'darkorange',
      color: 'white',
    },
    {
      tooltip: 'my account',
      icon: 'account_circle',
      backgroundColor: '#fcb332',
      color: 'white',
      routerLink: '/admin/account'
    },
    {
      tooltip: 'logout',
      icon: 'power_settings_new',
      backgroundColor: 'red',
      color: 'white',
      routerLink: '/login'
    }
  ];
};
export {navigation}
