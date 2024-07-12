import stringTemplate from '@/app/shared/utils/string-template';
import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

import { changeOption } from './constants/change';
import { BORDER_COLOR, COLOR, StyleChangeOptionType, styleChangeOption } from './constants/color';
import { styleOption } from './constants/style';
import { determineColor } from './helpers/determine-color';

@Directive({
  selector: '[appChangeColor]',
  standalone: true,
})
export class ChangeColorDirective implements OnChanges {
  @Input() public publicationDate = '';

  @Input() public type: StyleChangeOptionType = styleChangeOption.BORDER;

  public constructor(private el: ElementRef<HTMLElement>) {}

  private setBackgroundColor(date: string): void {
    const color = determineColor(date);
    this.el.nativeElement.style.backgroundColor = stringTemplate(COLOR, { color });
  }

  private setBorderColor(date: string): void {
    const color = determineColor(date);
    this.el.nativeElement.style.borderBottom = stringTemplate(BORDER_COLOR, { color });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes[changeOption.PUBLICATION_DATE] || changes[changeOption.TYPE]) {
      ((): void =>
        this.type === styleChangeOption.BORDER
          ? this.setBorderColor(this.publicationDate)
          : this.setBackgroundColor(this.publicationDate))();
    }
  }

  @HostBinding(styleOption.BACKGROUND) public get backgroundColor(): null | string {
    if (this.type === styleChangeOption.BACKGROUND) {
      const color = determineColor(this.publicationDate);
      return stringTemplate(COLOR, { color });
    }
    return null;
  }

  @HostBinding(styleOption.BORDER_BOTTOM) public get borderBottom(): null | string {
    if (this.type === styleChangeOption.BORDER) {
      const color = determineColor(this.publicationDate);
      return stringTemplate(BORDER_COLOR, { color });
    }
    return null;
  }
}
