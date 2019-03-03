/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatictemplatemessagingComponent } from './statictemplatemessaging.component';

describe('StatictemplatemessagingComponent', () => {
  let component: StatictemplatemessagingComponent;
  let fixture: ComponentFixture<StatictemplatemessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatictemplatemessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatictemplatemessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
