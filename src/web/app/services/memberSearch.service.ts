import { Injectable } from '@angular/core'
import { ApiService } from '@services/api.service'
import { of, from } from 'rxjs'
import { map, reduce, filter } from 'rxjs/operators'
export interface IMemberSearch {
  name: string;
  id: string;
  phone: string;
  level: number;
}
@Injectable()
export class MemberSearchService {
  constructor(private api: ApiService) {
  }
  search(search?: string, by?: string) {
    console.log(by)
    return from<IMemberSearch[]>([
      {
        name: 'nama saya a',
        id: '79febc5b-6e08-48b9-9d68-ba7c2dba3012',
        phone: '543215781',
        level: 1
      },
      {
        name: 'ok nama saya',
        id: '9a67cfec-4bd9-4e34-926c-72383a241426',
        phone: '589345781',
        level: 2
      },
      {
        name: 'ok nama saya',
        id: '02250ec8-c42b-41f5-b85f-e4809037f589',
        phone: '589345781',
        level: 2
      }
    ])
      .pipe(
        filter((d) => {
          return d[by].includes(search)
        }),
        map<IMemberSearch, string>(function (val) {
          return val[by]
        }),
        reduce(
          function(acc: string[], val:string, idx:number) {
            acc.push(val)
            return acc
          },
          []
        )
      )
  }
}
