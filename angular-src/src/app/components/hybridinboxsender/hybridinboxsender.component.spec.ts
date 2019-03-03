/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HybridinboxsenderComponent } from './hybridinboxsender.component';

describe('HybridinboxsenderComponent', () => {
  let component: HybridinboxsenderComponent;
  let fixture: ComponentFixture<HybridinboxsenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HybridinboxsenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HybridinboxsenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
