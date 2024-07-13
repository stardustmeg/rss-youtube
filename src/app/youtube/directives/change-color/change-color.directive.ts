import stringTemplate from '@/app/shared/utils/string-template';
import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

import { changeOption } from './constants/change';
import { styleColorOption } from './constants/color';
import { StyleChangeOptionType, styleChangeOption, styleOption } from './constants/style';
import { determineColor } from './helpers/determine-color';

@Directive({
  selector: '[appChangeColor]',
  standalone: true,
})
export class ChangeColorDirective implements OnChanges {
  @Input() public publicationDate = '';

  @Input() public type: StyleChangeOptionType = styleChangeOption.borderBottom;

  public constructor(private el: ElementRef<HTMLElement>) {}

  private applyColor(): string {
    const color = determineColor(this.publicationDate);
    return stringTemplate(styleColorOption[this.type], { color });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes[changeOption.PUBLICATION_DATE]) {
      this.el.nativeElement.style[this.type] = this.applyColor();
    }
  }

  @HostBinding(styleOption.background)
  public get backgroundColor(): string {
    return this.applyColor();
  }

  @HostBinding(styleOption.borderBottom)
  public get borderBottom(): string {
    return this.applyColor();
  }
}
