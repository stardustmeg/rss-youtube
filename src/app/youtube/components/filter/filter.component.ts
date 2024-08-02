import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIcon,
    CustomButtonComponent,
    FilterPipe,
    ReactiveFormsModule,
  ],
  providers: [FilterPipe],
  selector: 'app-filter',
  standalone: true,
  styleUrl: './filter.component.scss',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  public filterControl = new FormControl('');

  public videoService = inject(VideoDataService);
}
