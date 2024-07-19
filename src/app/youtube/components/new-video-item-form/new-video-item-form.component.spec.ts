import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVideoItemFormComponent } from './new-video-item-form.component';

describe('NewVideoItemFormComponent', () => {
  let component: NewVideoItemFormComponent;
  let fixture: ComponentFixture<NewVideoItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVideoItemFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewVideoItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
