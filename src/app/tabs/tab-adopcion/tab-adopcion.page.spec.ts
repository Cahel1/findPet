import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabAdopcionPage } from './tab-adopcion.page';

describe('TabAdopcionPage', () => {
  let component: TabAdopcionPage;
  let fixture: ComponentFixture<TabAdopcionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAdopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
