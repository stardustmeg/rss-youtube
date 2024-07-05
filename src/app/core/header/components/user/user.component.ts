import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { Component } from '@angular/core';

@Component({
  imports: [CustomButtonComponent],
  selector: 'app-user',
  standalone: true,
  styleUrl: './user.component.scss',
  templateUrl: './user.component.html',
})
export class UserComponent {}
