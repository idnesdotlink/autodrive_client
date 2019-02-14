import {Component, OnInit, Input} from '@angular/core'
import {overlayService} from './overlay.service'
import {CdkOverlayOrigin} from '@angular/cdk/overlay'

@Component({
  selector: 'has-overlay',
  templateUrl: 'has-overlay.html',
  styleUrls: [
    'has-overlay.scss'
  ]
})
export class HasOverlayComponent implements OnInit {

  @Input() overlayOrigin: CdkOverlayOrigin;
  constructor(private os: overlayService) {}

  ngOnInit() {

  }

  click() {
    this.os.open();
  }
}
