import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment';
import { ICreateProjectRequest, IProject } from '../models/projects.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly baseUrl: string = `${environment.apiBaseUrl}/projects`;
  private projectSubject = new BehaviorSubject<IProject | null>(null);

  constructor(private readonly http: HttpClient) {}

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.baseUrl}/user`);
  }

  createProject(project: ICreateProjectRequest): Observable<IProject> {
    return this.http.post<IProject>(`${this.baseUrl}`, project);
  }

  updateProject(project: Partial<IProject>): Observable<Partial<IProject>> {
    return this.http.put<Partial<IProject>>(`${this.baseUrl}/${project.id}`, project);
  }

  deleteProject(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.baseUrl}/${id}`);
  }


  loadProjectCardInformation(proyect: IProject): void {
    this.projectSubject.next(proyect);
    setTimeout(() => {
      this.projectSubject.next(null);
    }, 3000);
  }

  getProjectCardInformation(): Observable<IProject | null> {
    return this.projectSubject.asObservable();
  }
}
