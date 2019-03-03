import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'masksfilter'
})
export class MasksfilterPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }

  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
        return [];
    }
    if (!field || !value) {
        return items;
    }

    return items.filter(singleItem => singleItem[field].toLowerCase().includes(value.toLowerCase()));
  }

}
