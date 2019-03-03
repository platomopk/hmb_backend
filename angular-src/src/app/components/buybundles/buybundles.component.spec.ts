/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BuybundlesComponent } from './buybundles.component';

describe('BuybundlesComponent', () => {
  let component: BuybundlesComponent;
  let fixture: ComponentFixture<BuybundlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuybundlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuybundlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
