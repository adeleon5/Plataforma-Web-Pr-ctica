import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMenuComponent } from './cmenu.component';

describe('CMenuComponent', () => {
  let component: CMenuComponent;
  let fixture: ComponentFixture<CMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
