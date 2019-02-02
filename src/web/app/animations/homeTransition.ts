import {Component} from '@angular/core'
import {trigger, stagger, animate, style, group, query as q, transition, keyframes} from '@angular/animations'
const query = (s,a,o={optional:true})=>q(s,a,o);

export const homeTransition = trigger('homeTransition', [
  transition(':enter', [
    query('.block', style({ opacity: 0 })),
    query('.block', stagger(300, [
      style({ transform: 'translateY(100px)' }),
      animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
    ])),
  ]),
  transition(':leave', [
    query('.block', stagger(300, [
      style({ transform: 'translateY(0px)', opacity: 1 }),
      animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(100px)', opacity: 0})),
    ])),
  ])
]);

@Component({
  selector: 'home',
  template: `
    <h1>Home</h1>
    <div class="header">
      <div class="block">&nbsp;</div>
      <div class="block">&nbsp;</div>
      <div class="block">&nbsp;</div>
    </div>
  `,
  styles: [`
    .block {
      background: #eee;
      float: left;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 5px;
    }
  `],
  animations: [ homeTransition ],
  host: {
    '[@homeTransition]': ''
  }
})
export class Home { }
