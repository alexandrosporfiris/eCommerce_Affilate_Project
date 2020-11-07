import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDataViewComponent } from './product-data-view.component';

describe('ProductDataViewComponent', () => {
  let component: ProductDataViewComponent;
  let fixture: ComponentFixture<ProductDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
