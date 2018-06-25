import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { RelativeDatePipe } from './relative-date.pipe';
const secondsInAday = 86400;

@Pipe({
  name: 'smartDate'
})
export class SmartDatePipe implements PipeTransform {
  transform(dateStamp: number, relativeMax: number = 10): string {
    let timeAgoInSeconds = Math.floor((Date.now() - new Date(dateStamp).getTime()) / 1000);

    if (timeAgoInSeconds < relativeMax * secondsInAday) {
        return new RelativeDatePipe().transform(dateStamp);
    } else {
        return new Date(dateStamp).toLocaleDateString('en-GB');
    }

}

}
