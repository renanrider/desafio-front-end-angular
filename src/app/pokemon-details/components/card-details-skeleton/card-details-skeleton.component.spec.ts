import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsSkeletonComponent } from './card-details-skeleton.component';

describe('CardDetailsSkeletonComponent', () => {
  let component: CardDetailsSkeletonComponent;
  let fixture: ComponentFixture<CardDetailsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailsSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDetailsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
