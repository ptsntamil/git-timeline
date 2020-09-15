import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}
  BASE_URL = 'https://api.github.com';
  username: string;
  project: string;

  setProject(project: string) {
    this.project = project;
  }
  getProject(): string {
    return this.project;
  }

  setUsername(username: string) {
    this.username = username;
  }
  getUsername(): string {
    return this.username;
  }

  get(url: string) {
    return this.http.get(url).toPromise();
  }

  getProjects(username: string): Observable<Object> {
    const options = { params: new HttpParams().set('sort', 'created') };
    return this.http.get(`${this.BASE_URL}/users/${username}/repos`, options);
  }

  getUser(username: string): Observable<Object> {
    return this.http
      .get(`${this.BASE_URL}/users/${username}`)
      .pipe(catchError(this.handleError));
  }
  getProjectDetails(): Observable<Object> {
    return this.http.get(
      `${this.BASE_URL}/repos/${this.username}/${this.project}`
    );
  }
  getLanguagesUsed() {
    return this.http.get(
      `${this.BASE_URL}/repos/${this.username}/${this.project}/languages`
    );
  }

  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error

      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
