import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NewVideoItemFormComponent } from '../../components/new-video-item-form/new-video-item-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NewVideoItemFormComponent],
  selector: 'app-admin-page',
  standalone: true,
  styleUrl: './admin-page.component.scss',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent {}
