import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';

import { VideoStatisticsComponent } from '../../components/video-statistics/video-statistics.component';
import { ChangeColorDirective } from '../../directives/change-color/change-color.directive';
import { VideoItem } from '../../models/video-item.model';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  imports: [CustomLinkComponent, VideoStatisticsComponent, ChangeColorDirective, RouterLink, DatePipe],
  providers: [ChangeColorDirective, DatePipe],
  selector: 'app-detailed-info-page',
  standalone: true,
  styleUrl: './detailed-info-page.component.scss',
  templateUrl: './detailed-info-page.component.html',
})
export class DetailedInfoPageComponent implements OnInit {
  private route = inject(ActivatedRoute);

  private videoService = inject(VideoDataService);

  public video?: VideoItem;

  public constructor() {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const { id } = params;
      if (typeof id === 'string') {
        const video = this.videoService.getVideoById(id);
        video.subscribe((video) => {
          this.video = video;
        });
      }
    });
  }
}
