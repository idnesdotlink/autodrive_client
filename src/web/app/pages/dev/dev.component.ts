import {Component} from '@angular/core'
import {Router} from '@angular/router'
@Component({
  selector: 'page-dev',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class DevComponent {
  constructor(
    private router: Router
  ) { }
  clickBack() {
    this.router.navigate(['/admin/home']);
  }
}
