import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { ICreateProjectRequest, IProject } from '../models/projects.interface';

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

  createProject(project: ICreateProjectRequest): Observable<IProject> {
    return this.http.post<IProject>(`${this.baseUrl}`, project);
  }
}