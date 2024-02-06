import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClevertapTodayComponent } from './clevertap-today.component';

describe('ClevertapTodayComponent', () => {
  let component: ClevertapTodayComponent;
  let fixture: ComponentFixture<ClevertapTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClevertapTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClevertapTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
