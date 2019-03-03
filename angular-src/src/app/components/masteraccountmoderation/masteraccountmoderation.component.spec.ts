/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MasteraccountmoderationComponent } from './masteraccountmoderation.component';

describe('MasteraccountmoderationComponent', () => {
  let component: MasteraccountmoderationComponent;
  let fixture: ComponentFixture<MasteraccountmoderationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasteraccountmoderationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteraccountmoderationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
