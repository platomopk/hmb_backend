/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ApitestingComponent } from './apitesting.component';

describe('ApitestingComponent', () => {
  let component: ApitestingComponent;
  let fixture: ComponentFixture<ApitestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApitestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApitestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
