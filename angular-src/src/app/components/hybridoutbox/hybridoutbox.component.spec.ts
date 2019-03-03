/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HybridoutboxComponent } from './hybridoutbox.component';

describe('HybridoutboxComponent', () => {
  let component: HybridoutboxComponent;
  let fixture: ComponentFixture<HybridoutboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HybridoutboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HybridoutboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
