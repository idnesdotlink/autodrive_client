import {Component, forwardRef, Input, OnInit} from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  Validator,
  ValidationErrors,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Country } from './country.model';
import { CountryService } from './country.service';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InternationalCodeComponent),
  multi: true
};

@Component({
  selector: 'international-code, [internationalCode]',
  templateUrl: 'template.html',
  styleUrls: ['style.scss', 'flags.css'],
  providers: [
    COUNTER_CONTROL_ACCESSOR
  ]
})
export class InternationalCodeComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Input() defaultCountry: string;
  @Input() allowedCountries: Country[];
  countries: Country[];
  phoneNumber = '';
  value = ''
  onTouch: Function;
  onModelChange: Function;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    if (this.allowedCountries && this.allowedCountries.length) {
        this.countries = this.countryService.getCountriesByISO(this.allowedCountries);
    } else {
        this.countries = this.countryService.getCountries();
    }
    this.orderCountriesByName();
  }

  private orderCountriesByName() {
    this.countries = this.countries.sort(function (a, b) {
        return a['name'] > b['name'] ? 1 : b['name'] > a['name'] ? -1 : 0;
    });
  }

  writeValue(value: string) {
    this.value = value || '';
    this.phoneNumber = this.value;
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  validate(c: FormControl): ValidationErrors | null {
    return null
  }

}
