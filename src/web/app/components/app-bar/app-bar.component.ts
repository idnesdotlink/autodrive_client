import {Component, Input, Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'app-bar',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class AppBarComponent {
  @Input() navs: any[] = [];

  @Output() logo: EventEmitter<null> = new EventEmitter()

  logoClicked() {
    this.logo.emit();
  }
}
