import {Component, Input, OnInit} from '@angular/core'
@Component({
  selector: 'box-padding',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false
})
export class BoxPadding implements OnInit {
  @Input() padding: number = 0;

  @Input() background: string = 'transparent';

  @Input() boxBackground: string = 'transparent';

  padStyle: {} = {};
  boxStyle: {} = {};

  ngOnInit() {
    this.padStyle['backgroundColor'] = `${this.background}`;
    this.padStyle['padding'] = `${this.padding}px`;
    this.boxStyle['backgroundColor'] = `${this.boxBackground}`;
  }
}
