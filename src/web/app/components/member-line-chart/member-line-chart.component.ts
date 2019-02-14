import {Component} from '@angular/core'

@Component({
  selector: 'member-line-chart',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false
})
export class MemberLineChartComponent {

  colorScheme = {
    domain: [
      '#FFB300',
      '#E64A19',
      '#76ff03',
      '#2979ff',
      '#EC407A',
      '#BA68C8',
      '#fdd835',
      '#0091ea',
      '#ff8f00'
    ]
  };

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

  onSelect(e: any) {
  }
}
