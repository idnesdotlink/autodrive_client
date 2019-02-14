import {Component, Input, forwardRef} from '@angular/core'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'

@Component({
  selector: 'color-picker',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ],
  preserveWhitespaces: false
})
export class ColorPickerComponent implements ControlValueAccessor {

  constructor() {
  }

  @Input() public _color: string;
  onChange: any = () => { };
  onTouched: any = () => { };

  get color() {
    return this._color
  }

  set color(value) {
    this._color = value
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value){
    if (value === undefined || value === '') value = '#ffffff'
    this.color = value
  }

  registerOnChange(fn) {this.onChange = fn;}

  registerOnTouched() {}
}
