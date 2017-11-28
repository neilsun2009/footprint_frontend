import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmatchComponent } from './postmatch.component';

describe('PostmatchComponent', () => {
  let component: PostmatchComponent;
  let fixture: ComponentFixture<PostmatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostmatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
