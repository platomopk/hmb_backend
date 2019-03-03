/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BulkmessageComponent } from './bulkmessage.component';

describe('BulkmessageComponent', () => {
  let component: BulkmessageComponent;
  let fixture: ComponentFixture<BulkmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
