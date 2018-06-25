import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { RelativeDatePipe } from './relative-date.pipe';
const secondsInADay = 86400;

@Pipe({
  name: 'smartDate'
})
export class SmartDatePipe implements PipeTransform {

  transform(dateStamp: number, relativeMax: number = 10): string {
    return null;
  }

}
