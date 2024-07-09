import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CustomLinkComponent } from '../../shared/components/custom-link/custom-link.component';

@Component({
  imports: [CustomLinkComponent, RouterLink],
  selector: 'app-not-found-page',
  standalone: true,
  styleUrl: './not-found-page.component.scss',
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {}
