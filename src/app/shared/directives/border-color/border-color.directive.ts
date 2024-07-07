import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { differenceInDays, parseISO } from 'date-fns';

import { BORDER_COLOR, BorderColorOption, BorderColorOptionType } from '../../constants/border-color';
import stringTemplate from '../../utils/string-template';

@Directive({
  selector: '[appBorderColor]',
  standalone: true,
})
export class BorderColorDirective {
  @Input() publicationDate = '';

  constructor(private el: ElementRef) {}

  private setBorderColor(date: string): void {
    const now = new Date();
    const publicationDate = parseISO(date);
    const daysDifference = differenceInDays(now, publicationDate);

    let color: BorderColorOptionType;

    if (daysDifference > 180) {
      color = BorderColorOption.RED;
    } else if (daysDifference > 30) {
      color = BorderColorOption.YELLOW;
    } else if (daysDifference > 7) {
      color = BorderColorOption.GREEN;
    } else {
      color = BorderColorOption.BLUE;
    }
    this.el.nativeElement.style.borderBottom = stringTemplate(BORDER_COLOR, { color });
  }

  @HostBinding('style.borderBottom') get borderColor(): void {
    return this.setBorderColor(this.publicationDate);
  }
}
