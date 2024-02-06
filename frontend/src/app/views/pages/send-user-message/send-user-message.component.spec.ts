import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendUserMessageComponent } from './send-user-message.component';

describe('SendUserMessageComponent', () => {
  let component: SendUserMessageComponent;
  let fixture: ComponentFixture<SendUserMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendUserMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendUserMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
