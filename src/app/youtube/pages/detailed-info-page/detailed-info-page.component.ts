import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { appRoute } from '@/app/shared/constants/routes';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

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
  public video?: VideoItem;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoDataService,
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const VIDEO_ID: unknown = params['id'];
      if (typeof VIDEO_ID === 'string') {
        const video = this.videoService.getVideoById(VIDEO_ID);
        video.subscribe((video) => {
          if (!video) {
            this.router.navigate([appRoute.NOT_FOUND]);
          } else {
            this.video = video;
          }
        });
      }
    });
  }
}
