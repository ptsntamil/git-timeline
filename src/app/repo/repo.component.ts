import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { GithubService } from '../github.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss'],
})
export class RepoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RepoComponent>,
    public githubService: GithubService
  ) {}
  project;
  ngOnInit(): void {
    // this.getProject()
    this.githubService.getProjectDetails().subscribe((data) => {
      console.log(data);
      this.project = data;
    });
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
