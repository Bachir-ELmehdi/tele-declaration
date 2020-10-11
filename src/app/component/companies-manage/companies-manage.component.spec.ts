import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesManageComponent } from './companies-manage.component';

describe('CompaniesManageComponent', () => {
  let component: CompaniesManageComponent;
  let fixture: ComponentFixture<CompaniesManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
