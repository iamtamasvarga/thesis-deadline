/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DDDTextComponent } from './dddText.component';

describe('DDDTextComponent', () => {
  let component: DDDTextComponent;
  let fixture: ComponentFixture<DDDTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DDDTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DDDTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
