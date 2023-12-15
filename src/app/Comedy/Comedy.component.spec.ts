/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ComedyComponent } from './Comedy.component';

describe('ComedyComponent', () => {
  let component: ComedyComponent;
  let fixture: ComponentFixture<ComedyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComedyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComedyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
