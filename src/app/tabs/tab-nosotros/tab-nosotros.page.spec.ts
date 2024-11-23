import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabNosotrosPage } from './tab-nosotros.page';

describe('TabNosotrosPage', () => {
  let component: TabNosotrosPage;
  let fixture: ComponentFixture<TabNosotrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNosotrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
