import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteColorComponent } from './delete-color.component';

describe('DeleteColorComponent', () => {
  let component: DeleteColorComponent;
  let fixture: ComponentFixture<DeleteColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
