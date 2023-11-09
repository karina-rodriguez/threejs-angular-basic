import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGLComponent } from './view-gl.component';

describe('ViewGLComponent', () => {
  let component: ViewGLComponent;
  let fixture: ComponentFixture<ViewGLComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
