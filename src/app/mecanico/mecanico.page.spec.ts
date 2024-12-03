import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MecanicoPage } from './mecanico.page';

describe('MecanicoPage', () => {
  let component: MecanicoPage;
  let fixture: ComponentFixture<MecanicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
