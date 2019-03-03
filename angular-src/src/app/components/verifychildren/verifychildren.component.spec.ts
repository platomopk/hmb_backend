/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerifychildrenComponent } from './verifychildren.component';

describe('VerifychildrenComponent', () => {
  let component: VerifychildrenComponent;
  let fixture: ComponentFixture<VerifychildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifychildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifychildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
