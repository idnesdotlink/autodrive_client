import {Component, OnInit, OnDestroy} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ApiService} from '@services/api.service'
import {Router} from '@angular/router'
import {map as lodashMap} from 'lodash'
import {SubscriptionLike} from 'rxjs'
import {map} from 'rxjs/operators'

@Component({
  selector: 'page-install',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false,
  providers: [
    ApiService
  ]
})
export class InstallComponent implements OnInit, OnDestroy {
  installing: SubscriptionLike;
  configForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {}
  onSubmit(e: Event) {
    if (this.configForm.invalid) return;
    let conf: any = {};
    conf['host'] = this.f.host.value;
    conf['key'] = this.f.key.value;
    conf['port'] = this.f.port.value;
    conf['secure'] = this.f.secure.value;
    this.installing = this.api.install(conf).subscribe(
      (v) => {
        console.log(v);
        if(v) this.router.navigate(['/login'])
      }
    )
  }

  get f() {
    return this.configForm.controls
  }

  ngOnDestroy(): void {
    if(this.installing !== undefined) this.installing.unsubscribe();
  }

  ngOnInit() {
    this.configForm = this.formBuilder.group({
      host: ['127.0.0.1', Validators.required],
      port: [8000, Validators.required],
      key: ['ae3f398d-254e-4b23-8a5e-92cf931a82b0', Validators.required],
      secure: [false, Validators.required]
    });
  }

  clicked() {
    // console.log(this.install.key)
  }
}
