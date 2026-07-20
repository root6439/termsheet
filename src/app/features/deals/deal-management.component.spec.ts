import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealManagementComponent } from './deal-management.component';

describe('DealManagementComponent', () => {
  let component: DealManagementComponent;
  let fixture: ComponentFixture<DealManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
