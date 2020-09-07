import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from '../github.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  constructor(
    private githubService: GithubService,
    private router: ActivatedRoute
  ) {}
  username;
  projects;
  user;
  ngOnInit(): void {
    this.router.params.subscribe((param) => {
      this.username = param.username;
      this.getUser();
    });
  }

  getUser() {
    this.githubService.getUser(this.username).subscribe(
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
    this.githubService.getProjects(this.username).subscribe((data: any) => {
      this.projects = data;
    });
  }
}
