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
  installing: SubscriptionLike;
  private configForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private install: InstallService, private router: Router) {}
  onSubmit(e: Event) {
    if (this.configForm.invalid) return;
    this.installing = this.install.install(this.f.host.value, this.f.port.value, this.f.key.value).subscribe(
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
      host: ['http://127.0.0.1', Validators.required],
      port: [8000, Validators.required],
      key: ['ae3f398d-254e-4b23-8a5e-92cf931a82b0', Validators.required]
    });
  }
}
