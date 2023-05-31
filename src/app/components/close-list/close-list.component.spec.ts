import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseListComponent } from './close-list.component';

describe('CloseListComponent', () => {
  let component: CloseListComponent;
  let fixture: ComponentFixture<CloseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseListComponent]
    });
    fixture = TestBed.createComponent(CloseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
