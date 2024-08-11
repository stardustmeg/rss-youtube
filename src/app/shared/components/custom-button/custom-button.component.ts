import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MaterialButtonType, MaterialButtonTypeType } from '../../constants/custom-button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule],
  selector: 'app-custom-button',
  standalone: true,
  styleUrl: './custom-button.component.scss',
  templateUrl: './custom-button.component.html',
})
export class CustomButtonComponent {
  @Input() public attributeType: MaterialButtonTypeType = MaterialButtonType.RAISED;
  @Input() public customClass = '';
  @Input() public disabled = false;
  @Input() public icon = '';
}
