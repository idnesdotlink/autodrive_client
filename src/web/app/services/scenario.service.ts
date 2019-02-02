import {Injectable} from '@angular/core'
import {LocalStorage} from '@ngx-pwa/local-storage'

@Injectable()
export class Scenario {
  constructor(private storage: LocalStorage) {}

  saveScenario(data: any) {
    this.storage.setItemSubscribe('scenario', data);
  }

  getScenario() {
    return this.storage.getItem('scenario')
  }

  add() {
  }

  create() {
  }

  delete() {

  }
}
