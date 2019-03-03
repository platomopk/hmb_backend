/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InboxsenderComponent } from './inboxsender.component';

describe('InboxsenderComponent', () => {
  let component: InboxsenderComponent;
  let fixture: ComponentFixture<InboxsenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxsenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxsenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
