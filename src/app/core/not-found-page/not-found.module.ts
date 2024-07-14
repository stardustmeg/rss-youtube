import { SharedModule } from '@/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './not-found-page.component';

const routes: Routes = [{ component: NotFoundPageComponent, path: '', pathMatch: 'full' }];

@NgModule({
  declarations: [NotFoundPageComponent],
  exports: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class NotFoundModule {}
