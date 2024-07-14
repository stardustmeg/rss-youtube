import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ChangeColorDirective } from '../../directives/change-color/change-color.directive';
import { VideoItem } from '../../models/video-item.model';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  providers: [ChangeColorDirective, DatePipe],
  selector: 'app-detailed-info-page',
  styleUrl: './detailed-info-page.component.scss',
  templateUrl: './detailed-info-page.component.html',
})
export class DetailedInfoPageComponent implements OnInit {
  @Input() public video!: VideoItem;

  public constructor(
    private route: ActivatedRoute,
    private videoService: VideoDataService,
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const VIDEO_ID: unknown = params['id'];

      if (typeof VIDEO_ID === 'string') {
        const video = this.videoService.getVideoById(VIDEO_ID);
        this.video = video;
      }
    });
  }
}
