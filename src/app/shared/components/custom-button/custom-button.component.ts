import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatButtonModule, MatIconModule],
  selector: 'app-custom-button',
  standalone: true,
  styleUrl: './custom-button.component.scss',
  templateUrl: './custom-button.component.html',
})
export class CustomButtonComponent {
  @Input() buttonType: 'mat-icon-button' | 'mat-raised-button' = 'mat-raised-button';

  @Input() customClass = '';

  @Input() defaultClass = 'button';

  @Input() icon? = '';
}
