/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HybridcomposeComponent } from './hybridcompose.component';

describe('HybridcomposeComponent', () => {
  let component: HybridcomposeComponent;
  let fixture: ComponentFixture<HybridcomposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HybridcomposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HybridcomposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
