import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { ApiService } from '@services/api.service'

@Component(
  {
    selector: 'app-login',
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
  }
)
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['idnes.link@gmail.com', Validators.required],
      password: ['12345678', Validators.required]
    });
    this.api.logout().subscribe();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'admin/home';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.api.login(this.f.username.value, this.f.password.value, this.returnUrl)
      .subscribe()
  }
}
