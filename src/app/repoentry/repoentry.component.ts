import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { RepoComponent } from '../repo/repo.component';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repoentry',
  templateUrl: './repoentry.component.html',
  styleUrls: ['./repoentry.component.scss'],
})
export class RepoentryComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {
    //this.openDialog();
  }

  ngOnInit(): void {
    this.openDialog();
    this.route.params.subscribe((param) => {
      this.githubService.setProject(param.repo);
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RepoComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
