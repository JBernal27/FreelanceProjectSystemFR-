import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment';
import { ILoginResponse } from '../interfaces/responses/login.response.interface';
import { IUser } from '../interfaces/entities/user.interface';
import { IProject } from '../interfaces/entities/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseUrl: string = `${environment.apiBaseUrl}/projects`;

  constructor(
    private readonly http: HttpClient
  ) { }

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.baseUrl}/user`);
  }
}