import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MistakeComponent } from './mistake.component';

describe('MistakeComponent', () => {
  let component: MistakeComponent;
  let fixture: ComponentFixture<MistakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MistakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MistakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
