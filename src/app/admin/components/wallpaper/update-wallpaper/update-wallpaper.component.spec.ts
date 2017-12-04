import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWallpaperComponent } from './update-wallpaper.component';

describe('UpdateWallpaperComponent', () => {
  let component: UpdateWallpaperComponent;
  let fixture: ComponentFixture<UpdateWallpaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWallpaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
