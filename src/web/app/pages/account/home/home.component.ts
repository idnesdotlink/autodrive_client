import {AccountService} from '@services/account.service'
import {Router} from '@angular/router'
import {Component} from '@angular/core'

@Component({
  selector: 'account-home',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  providers: [
    AccountService
  ]
})
export class HomeComponent {
  constructor(private router: Router) { }

  clickBack() {
    this.router.navigate(['/admin/home']);
  }

  edit() {
    console.log('goto')
    this.router.navigate(['/admin/account/edit'])
  }
}
