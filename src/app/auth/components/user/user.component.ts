import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CustomLinkComponent, RouterLink],
  selector: 'app-user',
  standalone: true,
  styleUrl: './user.component.scss',
  templateUrl: './user.component.html',
})
export class UserComponent {}
