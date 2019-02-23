import {MatTableDataSource, PageEvent} from '@angular/material'
import {Component, OnInit, OnDestroy} from '@angular/core'
import {SelectionModel} from '@angular/cdk/collections'
import {Router, ActivatedRoute} from '@angular/router'
import {ClipboardService} from 'ngx-clipboard'
import {SubscriptionLike} from 'rxjs'
import {map as lodashMap, upperFirst, transform} from 'lodash'
import {pageStandard} from '@components/page-standard'

// services
import {expandTableRows} from '@animations/expandTableRow'
import {MembersService} from '@services/members.api.service'

@Component({
  selector: 'page-member-home',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  animations: [
    expandTableRows,
  ],
  providers: [
    MembersService
  ]
})
export class HomeComponent implements OnInit, OnDestroy, pageStandard {
  // paginator
  private subscription: SubscriptionLike;
  sidePanel: boolean = false;
  pageEvent: PageEvent;
  splitSizeA = 0;
  splitSizeB = 100;
  useTransition = true;
  length: number;
  pageSize = 100;
  pageSizeOptions = [100, 500];
  filters: any[];
  selection: any;
  items = [];
  wishes = [];
  columnsToDisplay: string[];
  columnsTitle: string[];
  // datas = [];
  done = [];
  expression = true;
  private dataSource: MatTableDataSource<[]>


  // dataSource = new MatTableDataSource(this.datas);

  constructor(
    private _clipboardService: ClipboardService,
    private route: ActivatedRoute,
    private router: Router,
    private members: MembersService
  ) {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<any>(allowMultiSelect, initialSelection);
    this.dataSource = new MatTableDataSource([]);
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  myClick() {
    if(this.splitSizeA > 0) {
      this.splitSizeA = 0;
      this.splitSizeB = 100;
    } else {
      this.splitSizeA = 20;
      this.splitSizeB = 80;
    }
  }

  dragEnd(e: any) {
    if(e.sizes[0] > 30) {
      this.splitSizeA = 30;
      this.splitSizeB = 70;
    }

    if(e.sizes[0] < 10) {
      this.splitSizeA = 0;
      this.splitSizeB = 100;
    }
    if(e.sizes[0] === 0) {
      this.sidePanel = false;
    } else {
      this.sidePanel = true;
    }

    this.splitSizeA = e.sizes[0];
    this.splitSizeB = e.sizes[1];
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getData() {
    this.filters = [
      [
        'status',
        'Semua',
        [['active', 1],['grace period', 2]]
      ],
      [
        'levels',
        'Semua',
        [['bronze', 1], ['silver', 2], ['gold', 3], ['diamond', 4], ['double diamond', 5], ['triple diamond', 6], ['ambassador', 7], ['double ambassador', 8], ['triple ambassador', 9]]
      ]
    ];
  }

  populate() {
    this.save();
    this.getData();
  }

  ngOnInit() {
    this.populate();
  }

  filterChange(n: string, e: any) {
    console.log([n, e]);
  }

  view(id: string) {
    this.router.navigate([`/admin/members/${id}`]);
  }

  onCopySuccess(e: any) {
    this._clipboardService.copyFromContent(e)
  }

  onCopyError() {}

  filtering() {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  create_new() {
    this.router.navigate([`/admin/members/store`]);
  }

  save() {
    this.subscription = this.members.get_all()
    .subscribe(
      members => {
        const { list, size, column } = members;
          this.columnsToDisplay = column;
          this.columnsTitle = lodashMap(column, title => upperFirst(title));
          this.length = size;
          let source = transform(list, (c, v: any, index) => {
            v.oddeven = (index%2 === 0) ? 'even' : 'odd'
            return c.push(v)
          }, []);
          this.expression = false;
          this.dataSource = new MatTableDataSource(source);
      },
      response => console.log(`POST call in error, ${response}`),
      () => console.log('Complete')
      );
  }

  clickBack() {
    this.router.navigate([`/admin/home`]);
  }
}
