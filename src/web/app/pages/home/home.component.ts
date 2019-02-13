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
        this.cols = 2
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.cols =1
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.Small
    ]).subscribe(
      result => {
        if(result.matches) {
          this.cols = 2
        }
      }
    )
    this.breakpointObserver.observe([
      Breakpoints.Medium
    ]).subscribe(
      result => {
        if(result.matches) {
          this.cols = 3;
        }
      }
    )
    this.breakpointObserver.observe([
      Breakpoints.Large
    ]).subscribe(
      result => {
        if(result.matches) {
          this.cols = 3;
        }
      }
    )

    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(
      result => {
        if(result.matches) {
          this.cols = 1;
        }
      }
    )
  }
  ngOnInit() { }
}
