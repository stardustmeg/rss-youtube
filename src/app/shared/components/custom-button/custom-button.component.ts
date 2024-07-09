import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CustomButtonType, CustomButtonTypeType } from '../../constants/custom-button';

@Component({
  imports: [MatButtonModule, MatIconModule],
  selector: 'app-custom-button',
  standalone: true,
  styleUrl: './custom-button.component.scss',
  templateUrl: './custom-button.component.html',
})
export class CustomButtonComponent {
  @Input() public attributeType: CustomButtonTypeType = CustomButtonType.RAISED;

  @Input() public customClass = '';

  @Input() public icon = '';
}
