import { Component, OnInit, OnDestroy, Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MemberSearchService, IMemberSearch } from '@services/memberSearch.service'
import { SubscriptionLike } from 'rxjs'
import { MatPaginatorIntl } from '@angular/material/paginator'

@Injectable()
export class LocalIntl extends MatPaginatorIntl {
  constructor() {super();
    // const intl =  new MatPaginatorIntl()
    this.itemsPerPageLabel = 'orang per page:'
    this.firstPageLabel = 'hal pertama'
    this.previousPageLabel = 'hal sebelumnya'
    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return `0 van ${length}`; }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;

      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} dari ${length}`;
    }
    return this;
  }
}
@Component({
  selector: 'member-search',
  templateUrl: 'template.html',
  styleUrls: [
    'style.scss'
  ],
  providers: [
    MemberSearchService,
    {
      provide: MatPaginatorIntl,
      useClass: LocalIntl
    },
  ]
})
export class MemberSearchComponent implements OnInit, OnDestroy {

  form: FormGroup
  maxLength = 64;
  items: string[];
  subs: SubscriptionLike;

  constructor(
    private _formBuilder: FormBuilder,
    private member: MemberSearchService
  ) {
    this.createFormGroup()
  }

  createFormGroup() {
    this.form = this._formBuilder.group({
      search: [''],
      by: ['name']
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if(this.subs !== undefined) this.subs.unsubscribe()
  }

  onSubmit() {
    this.subs = this.member.search(this.searchText, this.searchBy).subscribe(
      (v) => this.items = v
    )
  }

  clear() {
    this.form.get('search').setValue('')
  }

  get searchBy() {
    return this.form.get('by').value
  }

  set searchText(value) {
    this.form.get('search').setValue(value)
  }

  get searchText() {
    return this.form.get('search').value
  }

  search(e: Event) {
    e.preventDefault()
    console.log(e)
  }
}
