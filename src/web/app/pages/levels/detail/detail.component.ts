import {Component, OnInit, Input} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Location} from '@angular/common'
import {MatDialog} from '@angular/material'
import {Observable} from 'rxjs'

import {Level} from '@interfaces/level'
import {LevelsService} from '@services/levels.service'
import {ConfirmDialog} from '@components/confirm-dialog'
import {ApiService} from '@services/api.service'

@Component({
  selector: 'app-level-detail',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  providers: [
    ApiService
  ]
})
export class DetailComponent implements OnInit {

  public color: string = '#2889e9';
  public changed: boolean = false;
  private id: number;
  public level: Level;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private LevelsService: LevelsService,
    private location: Location,
    private dialog: MatDialog,
    private api: ApiService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.level = this.LevelsService.getDefault();
  }

  ngOnInit(): void {
    this.getLevel();
  }

  getLevel(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.LevelsService.getLevel(id)
      .subscribe(level => this.level = level);
  }

  clickEdit(): void {
    // this.router.navigate([`/admin/levels/${this.id}/edit`]);
  }

  clickBack(): void {
    this.router.navigate(['/admin/levels']);
  }
}
