import { Component, OnInit, OnDestroy, Input} from '@angular/core'

@Component({
  selector: 'page-table',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false
})
export class PageTable implements OnInit, OnDestroy {
  @Input() collection: any[];

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }
}
