import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MaterialButtonType, MaterialButtonTypeType } from '../../constants/custom-button';

@Component({
  imports: [MatButtonModule, MatIconModule],
  selector: 'app-custom-link',
  standalone: true,
  styleUrl: './custom-link.component.scss',
  templateUrl: './custom-link.component.html',
})
export class CustomLinkComponent {
  @Input() attributeType: MaterialButtonTypeType = MaterialButtonType.FAB;

  @Input() customClass = '';

  @Input() icon = '';
}
