import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectoresPage } from './directores.page';

describe('DirectoresPage', () => {
  let component: DirectoresPage;
  let fixture: ComponentFixture<DirectoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
