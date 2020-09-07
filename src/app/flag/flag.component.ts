import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
})
export class FlagComponent implements OnInit {
  constructor() {}
  @Input() project;
  @Input() direction: string;
  ngOnInit(): void {}
}
