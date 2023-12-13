import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDrinkFormComponent } from './search-drink-form.component';

describe('SearchDrinkFormComponent', () => {
  let component: SearchDrinkFormComponent;
  let fixture: ComponentFixture<SearchDrinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDrinkFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchDrinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
