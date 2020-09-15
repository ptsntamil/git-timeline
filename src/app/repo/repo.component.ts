import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { GithubService } from '../github.service';
import { Repository } from '../models/Repository';

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
  project: Repository;
  languages: Object;
  languagesData: any[] = [];
  ngOnInit(): void {
    // this.getProject()
    this.githubService.getProjectDetails().subscribe((data: Repository) => {
      this.project = data;
    });
    this.githubService.getLanguagesUsed().subscribe((data) => {
      this.languages = data;
      Object.keys(this.languages).forEach((k, i) => {
        this.languagesData.push({
          language: k,
          count: this.languages[k],
        });
      });
    });
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
