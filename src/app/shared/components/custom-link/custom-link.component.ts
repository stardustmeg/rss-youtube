import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatButtonModule, MatIconModule],
  selector: 'app-custom-link',
  standalone: true,
  styleUrl: './custom-link.component.scss',
  templateUrl: './custom-link.component.html',
})
export class CustomLinkComponent {
  @Input() customClass = '';

  @Input() defaultClass = 'link';

  @Input() icon = '';
}
