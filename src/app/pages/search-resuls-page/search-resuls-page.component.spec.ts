import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResulsPageComponent } from './search-resuls-page.component';

describe('SearchResulsPageComponent', () => {
  let component: SearchResulsPageComponent;
  let fixture: ComponentFixture<SearchResulsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResulsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResulsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
