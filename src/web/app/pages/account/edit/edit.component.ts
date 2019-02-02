import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms'
import {ErrorStateMatcher} from '@angular/material/core'
import {AccountService} from '@services/account.service'
import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {SubscriptionLike} from 'rxjs'

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty && control.touched);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

class CrossFieldErrorMatcher2 implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'account-edit',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  providers: [
    AccountService
  ]
})
export class EditComponent {
  accountForm: FormGroup;
  matcher: ErrorStateMatcher;
  matcher2: ErrorStateMatcher;

  constructor(
    private router: Router,
    private account: AccountService,
    private formBuilder: FormBuilder
  ) {
    this.accountForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        oldpassword: ['', [Validators.required]],
        password: ['', [Validators.required]],
        verifyPassword: ['']
      },
      {
        validator: this.checkPasswords
      }
    );
    this.matcher = new CrossFieldErrorMatcher();
    this.matcher2 = new CrossFieldErrorMatcher2();
  }
  clickBack() {
    this.router.navigate(['/admin/account']);
  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('verifyPassword').value;

    return condition ? { passwordsDoNotMatch: true } : null;
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let password = group.controls.password.value;
    let verifyPassword = group.controls.verifyPassword.value;
    return password === verifyPassword ? null : { passwordsDoNotMatch: true }
  }

  save() {
    let s: SubscriptionLike = this.account.update_account('a', 'b', 'c').subscribe(
      (value) => {
        console.log(value);
        s.unsubscribe();
      },
      (err) => {
        console.log(err);
        s.unsubscribe();
      }
    )
  }
}
