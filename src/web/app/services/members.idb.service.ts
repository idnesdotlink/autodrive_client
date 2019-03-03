import { Injectable, Injector } from '@angular/core'
import { IDBService, IMembers } from '@services/idb.service'
import { from, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import Dexie from 'dexie'

@Injectable()
export class MemberIdbServices {
  private db: IDBService
  private table: Dexie.Table<IMembers, number>;
  constructor() {
    this.db = Injector
      .create(
        {
          providers: [
            {
              provide: IDBService,
              deps: []
            }
          ]
        }
      )
    .get(IDBService);
    this.table = this.db.members
  }

  byId() {
    return this.add({name: 'test 2', level: 1})
  }

  add(item: IMembers, key?: number) {
    const transaction = this.db.transaction('rw', this.table, async () => {
      const id: number = await this.table.add(item, key)
      return id
    })
    return from(transaction)
  }

  delete(id: number) {
    const transaction = this.db.transaction('rw', this.table, async () => {
      await this.table.delete(id)
    })
    return from(transaction)
      .pipe(
        catchError(
          this.errorHandler
        )
      )
  }

  errorHandler(e) {
    return throwError(e)
  }
}
