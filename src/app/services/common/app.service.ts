import { Injectable } from '@angular/core';
import { RolesEnum } from '../enums/roles.enum';

@Injectable({ providedIn: 'root' })
export class AppService {

  // SCREEN_ENUM = ScreenEnum;
  // selectedScreen: ScreenEnum = ScreenEnum.NULL;

  role = RolesEnum;

  relativeTimePeriods = [
    [31536000, 'year'],
    [2419200, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second']
  ];

  constructor() { }

  relativeTime(date: number | Date, isUtc = true) {
    if (!(date instanceof Date)) date = new Date(date);
    const seconds = (+(new Date()) - +date) / 1000;
    for (let [secondsPer, name] of this.relativeTimePeriods) {
      if (seconds >= secondsPer) {
        const time = Math.floor(seconds / +secondsPer);
        return `${time} ${name}${time > 1 ? 's' : ''} ago`;
      }
    }
    return 'Just now';
  }
}
