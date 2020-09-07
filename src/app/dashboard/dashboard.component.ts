import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private githubService: GithubService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  //username: string = 'tes';
  username = new FormControl('', [Validators.required]);
  ngOnInit(): void {
    this.username.setValue(this.route.firstChild.snapshot.params['username']);
  }
  validateUser() {
    this.githubService.getUser(this.username.value).subscribe(
      (data: any) => {
        this.router.navigateByUrl(`/${this.username.value}`);
      },
      (err) => {
        this.username.setErrors({ invalid: true });
      }
    );
  }
  onSubmit() {
    this.validateUser();
  }
}
