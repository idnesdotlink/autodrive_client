import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'scroll-padding',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class ScrollPaddingComponent implements OnInit {
  @Input() padding = 0;

  style: {} = {};

  ngOnInit() {
    this.style['padding'] = `${this.padding}px`
  }
}
