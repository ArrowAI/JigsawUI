import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplicaitonComponent } from './new-applicaiton.component';

describe('NewApplicaitonComponent', () => {
  let component: NewApplicaitonComponent;
  let fixture: ComponentFixture<NewApplicaitonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApplicaitonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApplicaitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
