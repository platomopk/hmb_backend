/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HybridsentComponent } from './hybridsent.component';

describe('HybridsentComponent', () => {
  let component: HybridsentComponent;
  let fixture: ComponentFixture<HybridsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HybridsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HybridsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
