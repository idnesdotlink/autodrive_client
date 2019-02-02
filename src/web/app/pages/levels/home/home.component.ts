import {Component, OnInit} from '@angular/core'

import {Level} from '@interfaces'
import {LevelsService} from '@services/levels.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-levels',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class HomeComponent implements OnInit {
  levels: Level[];

  constructor(
    private LevelsService: LevelsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLevels();
  }

  getLevels(): void {
    this.LevelsService.getLevels()
    .subscribe(levels => this.levels = levels);
  }

  clickBack() {
    this.router.navigate(['/admin/home']);
  }
}
