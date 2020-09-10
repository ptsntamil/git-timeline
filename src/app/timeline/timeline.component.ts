import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from '../github.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { Repository } from '../models/Repository';

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
  username: string;
  projects: Repository[];
  user: User;
  ngOnInit(): void {
    this.router.params.subscribe((param) => {
      this.username = param.username;
      this.getUser();
    });
  }

  getUser() {
    this.githubService.getUser(this.username).subscribe(
      (data: User) => {
        this.user = data;
        this.githubService.setUsername(this.username);
        this.getProjects();
      },
      (err) => {
        this.githubService.setUsername('');
        this.user = {
          name: '',
          login: '',
        };
        //this.username.setErrors({ invalid: true });
      }
    );
  }

  getProjects() {
    this.githubService.getProjects(this.username).subscribe((data: any) => {
      this.projects = data;
    });
  }
}
