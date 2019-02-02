import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {config} from '@configs'

@Injectable()
export class AccountService {

  private config: any;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    this.config = config;
  }

  get_account(): Observable<{}> {
    const url = `${this.config.apiUrl}/account`
    const options = {
      headers: this.headers
    }
    return this.http.post(url, {}, options);
  }

  update_account(name: string, old_password: string, new_password: string): Observable<{}> {
    const url = `${this.config.apiUrl}/account`
    const body = {
      name, old_password, new_password
    };
    const options = {
      headers: this.headers
    }
    return this.http.patch(url, body, options);
  }
}
