/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HourGlassComponent } from './hourGlass.component';

describe('HourGlassComponent', () => {
  let component: HourGlassComponent;
  let fixture: ComponentFixture<HourGlassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourGlassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourGlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
