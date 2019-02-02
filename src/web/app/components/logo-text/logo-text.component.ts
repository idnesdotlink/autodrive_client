import {Component, Input} from '@angular/core'
@Component({
  selector: 'logo-text',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class LogoTextComponent {
  @Input() fill: string = 'white';
  mouseenter() {
    console.log('enter');
  }
}
