import {Component} from '@angular/core'
import {chartColorScheme} from '@mock/chartColorScheme'

@Component({
  selector: 'member-line-chart',
  templateUrl: 'template.html',
  preserveWhitespaces: false
})
export class ChartLineComponent {

  colorScheme = chartColorScheme;

  results: any[] =[
    {
      'name': 'A',
      'series': [
        {
          'name': '2010',
          'value': 400
        },
        {
          'name': '2011',
          'value': 300
        },
        {
          'name': '2012',
          'value': 200
        }
      ]
    },

    {
      'name': 'B',
      'series': [
        {
          'name': '2010',
          'value': 500
        },
        {
          'name': '2011',
          'value': 450
        },
        {
          'name': '2012',
          'value': 350
        }
      ]
    },

    {
      'name': 'C',
      'series': [
        {
          'name': '2010',
          'value': 300
        },
        {
          'name': '2011',
          'value': 350
        },
        {
          'name': '2012',
          'value': 250
        }
      ]
    }
  ];

  onSelect(e: any) { }
}
