import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TumuloDetailsComponent } from './tumulodetails.component';

describe('UserProfileComponent', () => {
  let component: TumuloDetailsComponent;
  let fixture: ComponentFixture<TumuloDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TumuloDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TumuloDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
