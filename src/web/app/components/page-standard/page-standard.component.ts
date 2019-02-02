import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core'
import {Location} from '@angular/common'

@Component({
  selector: 'page-standard',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class PageStandardComponent implements OnInit {
  @Input() title: string;

  @Input() padding: number = 10;

  @Input() background: string = 'grey';

  @Input() boxBackground: string = '#424242';

  @Input() barBottom: boolean = false;

  @Output() clickBack: EventEmitter<any> = new EventEmitter();

  classes: string[] = [];

  constructor(private location: Location) {

  }

  ngOnInit() {
    if (this.barBottom) this.classes.push('bottom');
  }

  close(e) {
    if(this.clickBack) {
      this.clickBack.emit()
    } else {
      console.log('test');
    }
  }
}
