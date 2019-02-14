import {Component, OnInit, OnDestroy} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {InstallService} from '@services/install.service'
import {Router} from '@angular/router'
import {map as lodashMap} from 'lodash'
import {SubscriptionLike} from 'rxjs'
import {map} from 'rxjs/operators'

@Component({
  selector: 'page-install',
  templateUrl: 'template.html',
  providers: [
    InstallService
  ]
})
export class InstallComponent implements OnInit, OnDestroy {
  private installing: SubscriptionLike;
  private configForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private install: InstallService, private router: Router) {}
  onSubmit(e: Event) {
    if (this.configForm.invalid) return;
    this.installing = this.install.install(this.f.url.value, this.f.key.value).subscribe(
      (v) => {
        if(v) this.router.navigate(['/login'])
      }
    )
  }

  get f() {
    return this.configForm.controls
  }

  ngOnDestroy(): void {
    this.installing.unsubscribe();
  }

  ngOnInit() {
    this.configForm = this.formBuilder.group({
      url: ['http://127.0.0.1:8000', Validators.required],
      key: ['api-key', Validators.required]
    });
  }
}
