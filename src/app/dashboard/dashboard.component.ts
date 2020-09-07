import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private githubService: GithubService) {}
  //username: string = 'tes';
  username = new FormControl('', [Validators.required]);
  ngOnInit(): void {}
  user: any;
  invalidUser: boolean = false;
  projects;
  getUser() {
    this.githubService.getUser(this.username.value).subscribe(
      (data: any) => {
        this.user = data;
        this.getProjects();
      },
      (err) => {
        this.username.setErrors({ invalid: true });
      }
    );
  }
  getProjects() {
    this.githubService
      .getProjects(this.username.value)
      .subscribe((data: any) => {
        this.projects = data;
      });
  }
}
