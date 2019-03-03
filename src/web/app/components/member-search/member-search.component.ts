import { Component, OnInit, OnDestroy, Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MemberSearchService, IMemberSearch } from '@services/memberSearch.service'
import { SubscriptionLike, of } from 'rxjs'
import { MatPaginatorIntl } from '@angular/material/paginator'
import { MemberIdbServices } from '@services/members.idb.service'
import { take } from 'rxjs/operators'
@Injectable()
export class LocalIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.itemsPerPageLabel = 'orang per halaman:'
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
    MemberIdbServices,
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
    private member: MemberSearchService,
    private memberIdb: MemberIdbServices
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
    this.form.get('by').valueChanges.subscribe(
      val => console.log(val)
    )
  }

  ngOnDestroy() {
    if(this.subs !== undefined) this.subs.unsubscribe()
  }

  onSubmit() {

    this.memberIdb.byId().subscribe(
      (v) => console.log(v)
    )

    this.items = []
    this.subs = this.member.search(this.searchText, this.searchBy).subscribe(
      (v) => this.items = v
    )
  }

  keyDownFunction(e: Event) {
    // console.log(e)
    this.onSubmit()
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
