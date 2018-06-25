import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smartDate'
})
export class SmartDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
