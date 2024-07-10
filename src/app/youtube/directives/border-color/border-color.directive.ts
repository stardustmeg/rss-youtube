import stringTemplate from '@/app/shared/utils/string-template';
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { differenceInDays, parseISO } from 'date-fns';

import { BORDER_COLOR, BorderColorOption, BorderColorOptionType } from '../../constants/border-color';
import { timePeriod } from '../constants/timePeriod';

@Directive({
  selector: '[appBorderColor]',
  standalone: true,
})
export class BorderColorDirective {
  @Input() publicationDate = '';

  constructor(private el: ElementRef<HTMLElement>) {}

  setBorderColor(date: string): void {
    const now = new Date();
    const publicationDate = parseISO(date);
    const daysDifference = differenceInDays(now, publicationDate);

    let color: BorderColorOptionType;

    if (daysDifference > timePeriod.HALF_YEAR) {
      color = BorderColorOption.RED;
    } else if (daysDifference > timePeriod.MONTH) {
      color = BorderColorOption.YELLOW;
    } else if (daysDifference > timePeriod.WEEK) {
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
