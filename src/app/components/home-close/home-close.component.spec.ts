import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCloseComponent } from './home-close.component';

describe('HomeCloseComponent', () => {
  let component: HomeCloseComponent;
  let fixture: ComponentFixture<HomeCloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCloseComponent]
    });
    fixture = TestBed.createComponent(HomeCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
