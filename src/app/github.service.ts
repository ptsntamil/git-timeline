import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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
  getProject() {
    return this.project;
  }

  setUsername(username: string) {
    this.username = username;
  }
  getUsername() {
    return this.username;
  }

  getProjects(username: string) {
    const options = { params: new HttpParams().set('sort', 'created') };
    return this.http.get(`${this.BASE_URL}/users/${username}/repos`, options);
  }

  getUser(username: string) {
    return this.http
      .get(`${this.BASE_URL}/users/${username}`)
      .pipe(catchError(this.handleError));
  }
  getProjectDetails() {
    return this.http.get(
      `${this.BASE_URL}/repos/${this.username}/${this.project}`
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