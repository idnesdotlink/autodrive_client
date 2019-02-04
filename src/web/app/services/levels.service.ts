import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'

import {Observable} from 'rxjs'

import {Level} from '@interfaces/level'

import {config} from '@configs'

@Injectable({
  providedIn: 'root',
})
export class LevelsService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = config.apiUrl
  }

  getDefault(): Level {
    return {
      name: '',
      id: 1,
      national_percentage: 0,
      area_percentage: 0,
      bonus_percentage: 0,
      group_percentage: 0
    }
  }

  getLevels(): Observable<Level[]> {
    return this.http.post<Level[]>(`${this.apiUrl}/level`, {}, {});
  }

  getLevel(id: number): Observable<Level> {
    return this.http.post<Level>(`${this.apiUrl}/level/detail`, {
      id: id
    }, {});
  }

  editLevel(): void {
    this.http.post(`${this.apiUrl}/level`, {}, {})
  }
}
