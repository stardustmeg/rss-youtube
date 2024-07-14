import { Component, Input } from '@angular/core';

import { MaterialButtonType, MaterialButtonTypeType } from '../../constants/custom-button';

@Component({
  selector: 'app-custom-link',
  styleUrl: './custom-link.component.scss',
  templateUrl: './custom-link.component.html',
})
export class CustomLinkComponent {
  @Input() public attributeType: MaterialButtonTypeType = MaterialButtonType.FAB;

  @Input() public customClass = '';

  @Input() public icon = '';
}
