import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoItemCardComponent } from './video-item-card.component';

describe('VideoItemCardComponent', () => {
  let component: VideoItemCardComponent;
  let fixture: ComponentFixture<VideoItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoItemCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
