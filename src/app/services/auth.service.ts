import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment';
import { ILoginResponse, IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = `${environment.apiBaseUrl}/auth`;

  constructor(private readonly http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(email: string, password: string): Observable<IUser> {
    const body = { email, password };

    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, body).pipe(
      map((response: ILoginResponse) => {
        if (response.token && response.user) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response.user.id.toString());
          localStorage.setItem('userName', response.user.name);
          localStorage.setItem('userEmail', response.user.email);

          return response.user;
        } else {
          throw new Error('Login failed: Invalid response');
        }
      })
    );
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    const body = { name, email, password };

    return this.http
      .post(`${this.baseUrl}/register`, body, { observe: 'response' })
      .pipe(
        map((response) => {
          if (response.status === 201) {
            return true;
          } else {
            throw new Error('Registration failed: Unexpected response status');
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }
}
