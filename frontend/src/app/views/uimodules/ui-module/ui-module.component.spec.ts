import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiModuleComponent } from './ui-module.component';

describe('UiModuleComponent', () => {
  let component: UiModuleComponent;
  let fixture: ComponentFixture<UiModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiModuleComponent]
    });
    fixture = TestBed.createComponent(UiModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
