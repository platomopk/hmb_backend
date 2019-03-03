/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AutorespondComponent } from './autorespond.component';

describe('AutorespondComponent', () => {
  let component: AutorespondComponent;
  let fixture: ComponentFixture<AutorespondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorespondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
