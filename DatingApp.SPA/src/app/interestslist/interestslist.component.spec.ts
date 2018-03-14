/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InterestslistComponent } from './interestslist.component';

describe('InterestslistComponent', () => {
  let component: InterestslistComponent;
  let fixture: ComponentFixture<InterestslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
