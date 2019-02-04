import {HttpClient, HttpHeaders} from '@angular/common/http'
import {LocalStorage} from '@ngx-pwa/local-storage'
import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {map, first} from 'rxjs/operators'
import jwtDecode from 'jwt-decode'

import {User} from '@interfaces/user'
import {config} from '@configs'

interface AuthenticationResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
};

interface DecodedJwt {
  sub: number;
  aud: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private access_token: BehaviorSubject<string>;
  private user: BehaviorSubject<User>;
  private headers: HttpHeaders;
  public access_token_observable: Observable<string>;
  public user_observable: Observable<User>;

  constructor(private http: HttpClient, private storage: LocalStorage) {
    this.access_token = new BehaviorSubject<string>(null);
    this.user = new BehaviorSubject<User>(null);
    this.storage.getItem('access_token').subscribe((access_token: string) => this.access_token.next(access_token));
    this.storage.getItem('user').subscribe((user: User) => this.user.next(user));
    this.access_token_observable = this.storage.getItem('access_token').pipe(first<string>());
    this.user_observable = this.storage.getItem('user').pipe(first<User>());
    this.headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    );
  }

  /**
   *
   */
  get access_token_value() {
    return this.access_token.value;
  }

  /**
   *
   */
  get user_access_token() {
    return this.user.value.access_token;
  }

  /**
   *
   */
  get user_role() {
    return this.user.value.role;
  }

  /**
   *
   * @param username
   * @param password
   */
  login(username: string, password: string) {
    return this.http.post<any>(`${config.apiUrl}/users/authenticate`, {
      password: password,
      email: username
    }, { headers: this.headers })
      .pipe(
        map((response: AuthenticationResponse) => {
          if (response && response.access_token) {
            const access_token = response.access_token;
            const decoded: DecodedJwt = jwtDecode(access_token);
            const { sub, aud } = decoded;
            const user: User = {
              id: sub,
              access_token: access_token,
              role: aud
            };
            this.storage.setItemSubscribe('access_token', access_token);
            this.storage.setItemSubscribe('user', user);
            this.user.next(user);
            this.access_token.next(access_token);
          }
        })
      );
  }

  /**
   * Logout
   */
  logout() {
    this.storage.removeItemSubscribe('access_token');
    this.storage.removeItemSubscribe('user');
    this.access_token.next(null);
    this.user.next(null);
  }


  get get_access_token_observable(): Observable<string> {
    return this.access_token_observable;
  }

  get get_user_observable(): Observable<User> {
    return this.user_observable;
  }
}
