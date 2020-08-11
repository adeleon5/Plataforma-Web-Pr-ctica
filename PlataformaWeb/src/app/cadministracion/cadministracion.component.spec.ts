import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CAdministracionComponent } from './cadministracion.component';

describe('CAdministracionComponent', () => {
  let component: CAdministracionComponent;
  let fixture: ComponentFixture<CAdministracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CAdministracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
