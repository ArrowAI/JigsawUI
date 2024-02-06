import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClevertapSnapshotComponent } from './clevertap-snapshot.component';

describe('ClevertapSnapshotComponent', () => {
  let component: ClevertapSnapshotComponent;
  let fixture: ComponentFixture<ClevertapSnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClevertapSnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClevertapSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
