/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LeareportingComponent } from './leareporting.component';

describe('LeareportingComponent', () => {
  let component: LeareportingComponent;
  let fixture: ComponentFixture<LeareportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeareportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeareportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
