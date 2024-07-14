import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { YoutubeModule } from '../youtube/youtube.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    AuthModule,
    YoutubeModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    AsyncPipe,
  ],
  providers: [AsyncPipe],
})
export class CoreModule {}
