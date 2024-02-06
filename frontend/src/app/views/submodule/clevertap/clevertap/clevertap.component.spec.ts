import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClevertapComponent } from './clevertap.component';

describe('ClevertapComponent', () => {
  let component: ClevertapComponent;
  let fixture: ComponentFixture<ClevertapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClevertapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClevertapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
