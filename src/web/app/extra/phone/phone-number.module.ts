import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberComponent } from './phone-number.component';
import { InternationalCodeComponent } from './international-code.component';
import { OnlyNumberDirective } from './only-number.directive';
import { CountryPipe } from './country.pipe';
import { CountryService } from './country.service';
import { MaterialModule } from '@modules/material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
      InternationalCodeComponent,
      PhoneNumberComponent,
      OnlyNumberDirective,
      CountryPipe
    ],
    exports: [
      InternationalCodeComponent,
      PhoneNumberComponent,
      CountryPipe
    ],
    providers: [CountryService]
})
export class InternationalPhoneNumberModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InternationalPhoneNumberModule,
      providers: [CountryService]
    };
  }
}
