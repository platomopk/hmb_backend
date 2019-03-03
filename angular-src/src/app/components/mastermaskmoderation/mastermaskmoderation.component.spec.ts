/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MastermaskmoderationComponent } from './mastermaskmoderation.component';

describe('MastermaskmoderationComponent', () => {
  let component: MastermaskmoderationComponent;
  let fixture: ComponentFixture<MastermaskmoderationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastermaskmoderationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastermaskmoderationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
