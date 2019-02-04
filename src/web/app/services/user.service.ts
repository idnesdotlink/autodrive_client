import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import env from '@environtment';

import {User} from '@interfaces/user'

@Injectable()
export class UserService {
  private apiUrl: string;
  constructor(private http: HttpClient) { this.apiUrl = env.api.url }

  getAll() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/users/` + id);
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

  update(user: User) {
    return this.http.put(`${this.apiUrl}/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/users/` + id);
  }
}
