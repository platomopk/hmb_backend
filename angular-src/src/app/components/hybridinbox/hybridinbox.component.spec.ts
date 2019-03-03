/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HybridinboxComponent } from './hybridinbox.component';

describe('HybridinboxComponent', () => {
  let component: HybridinboxComponent;
  let fixture: ComponentFixture<HybridinboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HybridinboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HybridinboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
