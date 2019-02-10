import {Component, OnInit} from '@angular/core'
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout'

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard-home',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class HomeComponent implements OnInit {

  cols = 1;

  constructor( private breakpointObserver: BreakpointObserver, private mediaMatcher: MediaMatcher) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
    ]).subscribe(result => {
      if (result.matches) {
        console.log(result)
        console.log('handset landscape')
        // this.activateHandsetLayout();
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        console.log(result)
        console.log('handset portrait')
        // this.activateHandsetLayout();
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.Small
    ]).subscribe(
      result => {
        if(result.matches) {
          this.cols = 1
          console.log(result)
          console.log('small')
        }
      }
    )
    this.breakpointObserver.observe([
      Breakpoints.Medium
    ]).subscribe(
      result => {
        if(result.matches) {
          this.cols = 2;
          console.log('medium')
        }
      }
    )
    this.breakpointObserver.observe([
      Breakpoints.Large
    ]).subscribe(
      result => {
        if(result.matches) {
          this.cols = 3;
          console.log('medium')
        }
      }
    )

    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(
      result => {
        if(result.matches) {
          this.cols = 1;
          console.log('xsmall')
        }
      }
    )
    const mediaQueryList = this.mediaMatcher.matchMedia('(min-width: 1px)');
    // mediaQueryList.
  }

  activateHandsetLayout() {

  }

  test() {
    // this.mediaMatcher.
  }

  aview: any[] = [250, 250];
  adoughnut: boolean = true;
  acolorScheme = {
    domain: ['#FFB300', '#E64A19', '#8BC34A', '#0288D1', '#EC407A', '#BA68C8', '#CDDC39']
  };

  amulti: any[] = [
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



  // single: any[];
  bsingle: any[] = [
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

  view: any[] = [250, 250];

  // options
  animations = false;
  showXAxis = false;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Level';
  showYAxisLabel = false;
  showGridLines = false;
  yAxisLabel = 'Member';

  colorScheme = {
    domain: ['#FFB300', '#E64A19', '#76ff03', '#2979ff', '#EC407A', '#BA68C8', '#fdd835', '#0091ea', '#ff8f00']
  };

  viewx = [400, 400];
  wow: any[] =[
    {
      'name': '31-11-2011',
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
      'name': '31-11-2012',
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
    }
  ];

  wow2: any[] = [
    {
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 40632
        },
        {
          'name': '2000',
          'value': 36953
        },
        {
          'name': '1990',
          'value': 31476
        }
      ]
    },
    {
      'name': 'United States',
      'series': [
        {
          'name': '2010',
          'value': 49737
        },
        {
          'name': '2000',
          'value': 45986
        },
        {
          'name': '1990',
          'value': 37060
        }
      ]
    },
    {
      'name': '31-11-2012',
      'series': [
        {
          'name': '2010',
          'value': 36745
        },
        {
          'name': '2000',
          'value': 34774
        },
        {
          'name': '1990',
          'value': 29476
        }
      ]
    },
    {
      'name': '31-11-2013',
      'series': [
        {
          'name': '2010',
          'value': 36240
        },
        {
          'name': '2000',
          'value': 32543
        },
        {
          'name': '1990',
          'value': 26424
        }
      ]
    }
  ];

  wow3: any[] = [
    {
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 40632
        },
        {
          'name': '2000',
          'value': 36953
        },
        {
          'name': '1990',
          'value': 31476
        }
      ]
    },
    {
      'name': 'United States',
      'series': [
        {
          'name': '2010',
          'value': 49737
        },
        {
          'name': '2000',
          'value': 45986
        },
        {
          'name': '1990',
          'value': 37060
        }
      ]
    },
    {
      'name': 'France',
      'series': [
        {
          'name': '2010',
          'value': 36745
        },
        {
          'name': '2000',
          'value': 34774
        },
        {
          'name': '1990',
          'value': 29476
        }
      ]
    },
    {
      'name': 'United Kingdom',
      'series': [
        {
          'name': '2010',
          'value': 36240
        },
        {
          'name': '2000',
          'value': 32543
        },
        {
          'name': '1990',
          'value': 26424
        }
      ]
    }
  ];

  ngOnInit() {
    // this.getMembers();
  }

  getMembers(): void {
    //this.MembersService.getMembers()
    //  .subscribe(members => this.members = members.slice(1, 5));
  }

  onSelect(e: any) {
  }
}
