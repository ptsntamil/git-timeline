import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
})
export class FlagComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  @Input() project;
  @Input() direction: string;
  ngOnInit(): void {}
  getProject(projectName: string) {
    this.router.navigate([`${projectName}`], { relativeTo: this.route });
  }
}
