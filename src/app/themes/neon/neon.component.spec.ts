/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NeonComponent } from './neon.component';

describe('NeonComponent', () => {
  let component: NeonComponent;
  let fixture: ComponentFixture<NeonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
