import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWallpaperComponent } from './delete-wallpaper.component';

describe('DeleteWallpaperComponent', () => {
  let component: DeleteWallpaperComponent;
  let fixture: ComponentFixture<DeleteWallpaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWallpaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
