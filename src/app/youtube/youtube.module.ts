import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '../shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { VideoItemCardComponent } from './components/search-results-list/components/video-item-card/video-item-card.component';
import { SearchResultsListComponent } from './components/search-results-list/search-results-list.component';
import { SortComponent } from './components/sort/sort.component';
import { VideoStatisticsComponent } from './components/video-statistics/video-statistics.component';
import { ChangeColorDirective } from './directives/change-color/change-color.directive';
import { DetailedInfoPageComponent } from './pages/detailed-info-page/detailed-info-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { SortPipe } from './pipes/sort/sort.pipe';

@NgModule({
  declarations: [
    VideoStatisticsComponent,
    ChangeColorDirective,
    FilterComponent,
    SearchComponent,
    SearchResultsListComponent,
    MainPageComponent,
    VideoItemCardComponent,
    SortComponent,
    DetailedInfoPageComponent,
    FilterPipe,
    SearchPipe,
    SortPipe,
  ],
  exports: [
    VideoStatisticsComponent,
    ChangeColorDirective,
    FilterComponent,
    SearchComponent,
    SearchResultsListComponent,
    MainPageComponent,
    VideoItemCardComponent,
    SortComponent,
    DetailedInfoPageComponent,
    FilterPipe,
    SearchPipe,
    SortPipe,
    NgFor,
  ],
  imports: [
    DatePipe,
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIcon,
    MatChipsModule,
  ],
  providers: [],
})
export class YoutubeModule {}
