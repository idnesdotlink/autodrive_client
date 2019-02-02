import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-configuration',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class PreferenceComponent {

  constructor(private router: Router) { }
  clickBack() {
    this.router.navigate(['/admin/home']);
  }
}
