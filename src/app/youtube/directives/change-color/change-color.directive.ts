import stringTemplate from '@/app/shared/utils/string-template';
import { Directive, HostBinding, Input } from '@angular/core';

import { styleColorOption } from './constants/color';
import { StyleChangeOptionType, styleChangeOption, styleOption } from './constants/style';
import { determineColor } from './helpers/determine-color';

@Directive({
  selector: '[appChangeColor]',
  standalone: true,
})
export class ChangeColorDirective {
  @Input() public publicationDate = '';

  @Input() public type: StyleChangeOptionType = styleChangeOption.borderBottom;

  public constructor() {}

  private applyColor(): string {
    const color = determineColor(this.publicationDate);
    return stringTemplate(styleColorOption[this.type], { color });
  }

  @HostBinding(styleOption.background) public get backgroundColor(): string {
    return this.applyColor();
  }

  @HostBinding(styleOption.borderBottom) public get borderBottom(): string {
    return this.applyColor();
  }
}
