import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { CustomLinkComponent } from '../../shared/components/custom-link/custom-link.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CustomLinkComponent, RouterLink, CustomButtonComponent],
  selector: 'app-not-found-page',
  standalone: true,
  styleUrl: './not-found-page.component.scss',
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {}
