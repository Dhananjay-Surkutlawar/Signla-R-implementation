import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatINputComponent } from './chat-input.component';

describe('ChatINputComponent', () => {
  let component: ChatINputComponent;
  let fixture: ComponentFixture<ChatINputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatINputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatINputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
