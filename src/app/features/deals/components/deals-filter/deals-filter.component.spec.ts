import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsFilterComponent } from './deals-filter.component';

describe('DealsFilterComponent', () => {
  let component: DealsFilterComponent;
  let fixture: ComponentFixture<DealsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
