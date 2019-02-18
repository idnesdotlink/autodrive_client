import {Component} from '@angular/core'
import {chartColorScheme} from '@mock/chartColorScheme'

@Component({
  selector: 'member-donut-chart',
  templateUrl: 'template.html',
  preserveWhitespaces: false
})
export class ChartDonutComponent {

  results: any[] = [
    {
      'name': 'Bronze',
      'value': 15000
    },
    {
      'name': 'Silver',
      'value': 2380
    },
    {
      'name': 'Gold',
      'value': 1250
    },
    {
      'name': 'Diamond',
      'value': 678
    },
    {
      'name': 'Double Diamond',
      'value': 40
    },
    {
      'name': 'Triple Diamond',
      'value': 10
    },
    {
      'name': 'Ambassador',
      'value': 2
    },
    {
      'name': 'Double Ambassador',
      'value': 3
    },
    {
      'name': 'Triple Ambassador',
      'value': 5
    },
    {
      'name': 'Double Ambassador',
      'value': 4
    },
    {
      'name': 'Triple Ambassador',
      'value': 2
    }
  ];

  colorScheme = chartColorScheme;

  onSelect(e: any) { }
}
