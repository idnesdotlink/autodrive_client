import {Component, Input, Output, OnChanges, EventEmitter} from '@angular/core'

@Component({
  selector: 'color-picker',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class ColorPickerComponent implements OnChanges {
  @Input() public color: string = '#ffffff';

  @Output() change: EventEmitter<any> = new EventEmitter();

  ngOnChanges():void {
    this.change.emit(this.color);
  }
}
