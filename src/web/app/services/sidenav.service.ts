import {Injectable, EventEmitter} from '@angular/core'

@Injectable()
export class SidenavService {

  dataStr = new EventEmitter();

  constructor() { }

  sendMessage(data: string) {
    this.dataStr.emit(data);
  }
}
