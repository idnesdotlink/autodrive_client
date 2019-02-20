import { Injectable } from '@angular/core'
import { MatPaginatorIntl } from '@angular/material/paginator'

@Injectable()
export class paginatorIntl {
  constructor() {
    const intl =  new MatPaginatorIntl()
    intl.itemsPerPageLabel = 'item per halaman:'
    intl.firstPageLabel = 'hal pertama'
    intl.previousPageLabel = 'hal sebelumnya'
    intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return `0 van ${length}`; }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;

      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} dari ${length}`;
    }
    return intl;
  }
}
