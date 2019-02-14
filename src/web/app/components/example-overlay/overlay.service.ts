import {Injectable, ElementRef} from '@angular/core'
import {
  Overlay,
  OverlayConfig,
  CdkOverlayOrigin,
  OverlayConnectionPosition,
  OriginConnectionPosition,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay'
import {ComponentPortal} from '@angular/cdk/portal'
import {ExampleOverlayComponent} from './example-overlay.component'
@Injectable()
export class overlayService {

  // public ref: ElementRef
  // public pos: OriginConnectionPosition;
  // public ov: OverlayConnectionPosition;
  // Inject overlay service
  public origin: FlexibleConnectedPositionStrategy
  constructor(private overlay: Overlay) { }

  open() {
    console.log('clicked')

    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.overlay.create();

    // const position = this.overlay.position().flexibleConnectedTo()

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(ExampleOverlayComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);
  }
}
