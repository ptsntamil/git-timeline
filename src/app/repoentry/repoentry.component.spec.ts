import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoentryComponent } from './repoentry.component';

describe('RepoentryComponent', () => {
  let component: RepoentryComponent;
  let fixture: ComponentFixture<RepoentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
