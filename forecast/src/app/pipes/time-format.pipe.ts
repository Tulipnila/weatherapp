import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(isoString: string): string {
    const timePart = isoString.split('T')[1];
    const formattedTime = timePart.substring(0, 5); // Extract HH:mm part
    return formattedTime;
  }

}
