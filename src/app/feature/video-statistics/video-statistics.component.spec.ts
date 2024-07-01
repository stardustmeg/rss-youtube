import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStatisticsComponent } from './video-statistics.component';

describe('VideoStatisticsComponent', () => {
  let component: VideoStatisticsComponent;
  let fixture: ComponentFixture<VideoStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoStatisticsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
