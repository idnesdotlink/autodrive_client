import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Location} from '@angular/common'
import {MatDialog} from '@angular/material'
import {Observable} from 'rxjs'

import {Level} from '@interfaces'
import {LevelsService} from '@services/levels.service'
import {ConfirmDialog} from '@components/confirm-dialog'

@Component({
  selector: 'levels-edit',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class EditComponent implements OnInit {

  id: number;
  level: Level;


  public color: string = '#2889e9';
  public changed: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private LevelsService: LevelsService,
    private location: Location,
    private dialog: MatDialog
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

  clickBack(): void {
    this.router.navigate([`/admin/levels/${this.id}`]);
  }

  clickSave(): void {
    this.LevelsService.editLevel()
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.changed) return true;

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px'
    });
    return dialogRef.afterClosed();
  }
}
