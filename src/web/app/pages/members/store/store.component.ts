import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MatSnackBar, MatBottomSheet, MatDialog} from '@angular/material'
import {Router} from '@angular/router'
import {SubscriptionLike} from 'rxjs'
import {map, forEach, find, transform} from 'lodash'
import {Observable} from 'rxjs'
import {ConfirmDialog} from '@components/confirm-dialog'

// import { SnackbarNotification } from '@components/snackbar-notification';
// import { PageBottomSheet } from '@components/page-bottom-sheet';
import {AddressesService} from '@services/addresses.service'

/**
 * @title Stepper overview
 */
@Component({
  selector: 'members-store',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  providers: [
    AddressesService
  ]
})
export class StoreComponent implements OnInit, AfterViewInit, OnDestroy {
  private emptyOptions = [{value: '', name: ''}];
  isLinear = true;
  changed: boolean = false;
  personalGroup: FormGroup;
  addressGroup: FormGroup;
  addressSelect: any = [
    ['Provinsi', 'provinces', 'province', 'regencies'],
    ['Kota/Kabupaten', 'regencies', 'regency', 'districts'],
    ['Kecamatan', 'districts', 'district', 'villages'],
    ['Kelurahan/Desa', 'villages', null, null]
  ];
  addressSelected: {};
  oktosave: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private addresses: AddressesService,
    private router: Router,
    public bottomSheet: MatBottomSheet,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.personalGroup = this._formBuilder.group({
      nama: ['', Validators.required],
      gender: ['L', Validators.required],
      identity: ['ktp', Validators.required],
      phone: ['', Validators.required],
      pin: ['', Validators.required],
    });

    this.addressGroup = this._formBuilder.group({
      provinces: [{ value: '', disabled: false }, Validators.required],
      regencies: [{ value: '', disabled: true }, Validators.required],
      districts: [{ value: '', disabled: true }, Validators.required],
      villages: [{ value: '', disabled: true }, Validators.required],
      address: [{ value: '', disabled: false }, Validators.required]
    });
    this.addressSelect = map(this.addressSelect, select => this.populate_select(select));
    this.get_administrative_division('provinces');
  }

  ngOnDestroy(): void {
  }

  clickBack() {
    this.router.navigate(['/admin/members']);
  }

  populate_select(group: any): any {
    group.label = group[0];
    group.formControlName = group[1];
    group.options = this.emptyOptions;
    return group;
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.changed) return true;
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px'
    });
    return dialogRef.afterClosed();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  animationDone() {
    console.log('animation done')
  }

  /**
   *
   * @param type
   * @param search
   */
  get_administrative_division(type: string, where?: any, control?: any): void {
    let subscription: SubscriptionLike = this
      .addresses
      .get_administrative_division(type, where, true)
      .subscribe(
        (value) => {
          this.set_options(type, value);
          if(control) control.enable();
          subscription.unsubscribe();
        },
        (e) => {
          this.addressGroup.get('provinces').setValue('');
          this.snackBar.open('Maaf terjadi kesalahan', null, { duration: 6000 });
        }
      );
  }

  set_options(type: string, value: any) {
    this.addressSelect = map(
      this.addressSelect,
      (form) => {
        form.options = (form.formControlName === type) ? value : form.options;
        return form;
      }
    )
  }

  set_no_options(type: string) {
    this.set_options(type, this.emptyOptions);
  }

  get_text_value() {
  }

  ngAfterViewInit(): void {
    forEach(this.addressSelect, (g) => {
      let addressGroup = this.addressGroup;
      let chain1 = addressGroup.controls[g[1]];
      let chain2: any = (g[3]) ? addressGroup.controls[g[3]] : false;
      if(chain2 !== false)
      chain1.valueChanges.subscribe(
        v => {
          chain2.setValue('');
          this.set_no_options(g[3]);
          chain2.disable();
          let where = {};
          where[g[2]] = v;
          if (v !== '') this.get_administrative_division(g[3], where, chain2)
        }
      );

    });

    this.addressGroup.valueChanges.subscribe(
      (v) => {
        this.addressSelected = transform(v, (acc, val, key: any) => {
          if (key === 'address') {
            acc[key] = val
          } else {
            let area = find(this.addressSelect, v => v.formControlName === key).options;
            acc[key] = find(area, v => v.value === `${val}`).name;
          }
          return acc;
        }, {})
        console.log(this.addressSelected);
        console.log(this.addressGroup.valid === true);
      }
    )
  }

  save() {}
}
