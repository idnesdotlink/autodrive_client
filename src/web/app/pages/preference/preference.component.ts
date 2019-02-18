import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-configuration',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class PreferenceComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      darkTheme: [true, Validators.required],
    });
  }

  clickBack() {
    this.router.navigate(['/admin/home']);
  }

  onSubmit() {

  }
}
