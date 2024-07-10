import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { format, parseISO } from 'date-fns';

import { VideoStatisticsComponent } from '../../components/video-statistics/video-statistics.component';
import { ChangeColorDirective } from '../../directives/change-color/change-color.directive';
import { VideoItem } from '../../models/video-item.model';
import { VideoDataService } from '../../services/video-data/video-data.service';

const DATE_FORMAT = 'EEEE, dd MMMM yyyy';
@Component({
  imports: [CustomLinkComponent, VideoStatisticsComponent, ChangeColorDirective, RouterLink],
  providers: [ChangeColorDirective],
  selector: 'app-detailed-info-page',
  standalone: true,
  styleUrl: './detailed-info-page.component.scss',
  templateUrl: './detailed-info-page.component.html',
})
export class DetailedInfoPageComponent implements OnInit {
  @Input() video!: VideoItem;

  videoPublicationDate!: string;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoDataService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const VIDEO_ID: unknown = params['id'];

      if (typeof VIDEO_ID === 'string') {
        const video = this.videoService.getVideoById(VIDEO_ID);
        this.video = video;
        this.videoPublicationDate = format(parseISO(video.snippet.publishedAt), DATE_FORMAT);
      }
    });
  }
}
