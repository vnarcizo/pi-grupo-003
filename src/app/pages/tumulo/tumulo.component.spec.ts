import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TumuloComponent } from './tumulo.component';

describe('TumuloComponent', () => {
  let component: TumuloComponent;
  let fixture: ComponentFixture<TumuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TumuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TumuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
