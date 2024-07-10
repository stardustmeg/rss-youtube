import { ColorOptionType, colorOption } from '@/app/youtube/directives/change-color/constants/color';
import { differenceInDays, parseISO } from 'date-fns';

import { timePeriod } from '../../constants/timePeriod';

export const determineColor = (date: string): ColorOptionType => {
  const now = new Date();
  const publicationDate = parseISO(date);
  const daysDifference = differenceInDays(now, publicationDate);

  switch (true) {
    case daysDifference > timePeriod.HALF_YEAR:
      return colorOption.RED;
    case daysDifference > timePeriod.MONTH:
      return colorOption.YELLOW;
    case daysDifference > timePeriod.WEEK:
      return colorOption.GREEN;
    default:
      return colorOption.BLUE;
  }
};
