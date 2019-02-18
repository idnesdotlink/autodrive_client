import {Component} from '@angular/core'
import {Input} from '@angular/core'
import {chartColorScheme} from '@mock/chartColorScheme'

@Component({
  selector: 'chart-bar',
  templateUrl: 'template.html',
  preserveWhitespaces: false
})
export class ChartBarComponent {

  @Input() mode: 'horizontal' | 'vertical' = 'horizontal';

  results: any[] = [
    {
      'name': 'Bronze',
      'value': 30
    },
    {
      'name': 'Silver',
      'value': 20
    },
    {
      'name': 'Gold',
      'value': 20
    },
    {
      'name': 'Diamond',
      'value': 10
    },
    {
      'name': 'Double Diamond',
      'value': 5
    },
    {
      'name': 'Triple Diamond',
      'value': 10
    },
    {
      'name': 'Ambassador',
      'value': 10
    },
    {
      'name': 'Double Ambassador',
      'value': 10
    },
    {
      'name': 'Triple Ambassador',
      'value': 10
    }
  ];

  colorScheme = chartColorScheme;
  onSelect(e: any) { }
}
