/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuickmessageComponent } from './quickmessage.component';

describe('QuickmessageComponent', () => {
  let component: QuickmessageComponent;
  let fixture: ComponentFixture<QuickmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
