import {Component} from '@angular/core'
import {listing} from './list'
import {ClipboardService} from 'ngx-clipboard'
import {MatSnackBar} from '@angular/material'
@Component({
  selector: 'icon-font-list',
  templateUrl: 'template.html',
  preserveWhitespaces: false
})
export class IconFontListComponent {
  public icons: any;
  constructor(private clipboard: ClipboardService, private snackbar: MatSnackBar) {
    this.icons = listing;
  }
  click(id: string) {
    this.clipboard.copyFromContent(id);
    this.snackbar.open('copy to clipboard success', '', { duration: 600 });
  }
}
