/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LightRopeComponent } from './lightRope.component';

describe('LightRopeComponent', () => {
  let component: LightRopeComponent;
  let fixture: ComponentFixture<LightRopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightRopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightRopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
