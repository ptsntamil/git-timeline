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
  chatData: [];
  languageData = [];
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

  async getProjects() {
    this.githubService
      .getProjects(this.username)
      .subscribe(async (data: Repository[]) => {
        this.projects = data;
        this.githubService
          .getOverallLanguages(this.projects)
          .subscribe((languages) => {
            let {total, langs} = this.calculateLangs(languages)

            for (let lang in langs) {
              this.languageData.push({ language: lang, count: langs[lang] })
            }
          })
        //this.fetLanguages();
      });
  }
 
  calculateLangs(languages) {
    let total = 0
    const langs = languages.reduce((acc, crr):any => {
      Object.keys(crr).forEach((lan) :any => {
        if (acc[lan]) {
          acc[lan] = acc[lan] + crr[lan];
        } else {
          acc[lan] = crr[lan];
        }
        total = total + crr[lan];
      })
      return acc;
    }, {})
    return {total, langs}
  }
  async fetLanguages() {
    let languages = {},
      languagesData = {};
    for (let i = 0; i < this.projects.length; i++) {
      languages = await this.githubService.get(this.projects[i].languages_url);

      let keys = Object.keys(languages);

      for (let j = 0; j < keys.length; j++) {
        languagesData[keys[j]] = languagesData[keys[j]]
          ? languages[keys[j]] + languages[keys[j]]
          : languages[keys[j]];
      }
      if (i === this.projects.length - 1) {
        let keys = Object.keys(languagesData);
        for (let k = 0; k < keys.length; k++) {
          this.languageData.push({
            language: keys[k],
            count: languagesData[keys[k]],
          });
        }
      }
    }
  }
}
