import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'member-search',
  templateUrl: 'template.html',
  styleUrls: [
    'style.scss'
  ]
})
export class MemberSearchComponent implements OnInit, OnDestroy {

  form: FormGroup

  constructor(
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      search: [''],
    });
  }

  ngOnDestroy() {}

  onSubmit() {
    console.log('start search')
  }

  clear() {
    this.form.get('search').setValue('')
  }

  get searchText() {
    return this.form.get('search').value
  }

  search(e: Event) {
    e.preventDefault()
    console.log(e)
  }



}
