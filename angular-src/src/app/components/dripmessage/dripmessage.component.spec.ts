/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DripmessageComponent } from './dripmessage.component';

describe('DripmessageComponent', () => {
  let component: DripmessageComponent;
  let fixture: ComponentFixture<DripmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DripmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DripmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
