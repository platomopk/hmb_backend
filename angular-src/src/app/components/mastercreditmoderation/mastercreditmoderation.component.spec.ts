/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MastercreditmoderationComponent } from './mastercreditmoderation.component';

describe('MastercreditmoderationComponent', () => {
  let component: MastercreditmoderationComponent;
  let fixture: ComponentFixture<MastercreditmoderationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastercreditmoderationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastercreditmoderationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
