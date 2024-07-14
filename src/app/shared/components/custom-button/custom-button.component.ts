import { Component, Input } from '@angular/core';

import { MaterialButtonType, MaterialButtonTypeType } from '../../constants/custom-button';

@Component({
  selector: 'app-custom-button',
  styleUrl: './custom-button.component.scss',
  templateUrl: './custom-button.component.html',
})
export class CustomButtonComponent {
  @Input() public attributeType: MaterialButtonTypeType = MaterialButtonType.RAISED;

  @Input() public customClass = '';

  @Input() public disabled = false;

  @Input() public icon = '';
}
