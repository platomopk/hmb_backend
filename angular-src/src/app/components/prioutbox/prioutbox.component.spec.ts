/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrioutboxComponent } from './prioutbox.component';

describe('PrioutboxComponent', () => {
  let component: PrioutboxComponent;
  let fixture: ComponentFixture<PrioutboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioutboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioutboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
