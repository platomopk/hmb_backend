/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerifydriversComponent } from './verifydrivers.component';

describe('VerifydriversComponent', () => {
  let component: VerifydriversComponent;
  let fixture: ComponentFixture<VerifydriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifydriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifydriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
