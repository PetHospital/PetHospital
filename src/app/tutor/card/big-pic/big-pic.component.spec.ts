import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigPicComponent } from './big-pic.component';

describe('BigPicComponent', () => {
  let component: BigPicComponent;
  let fixture: ComponentFixture<BigPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
