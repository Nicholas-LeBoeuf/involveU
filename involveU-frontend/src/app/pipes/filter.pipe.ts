import { Pipe, PipeTransform } from '@angular/core';
import {Club} from "../objects/club";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Club[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.clubName.toLocaleLowerCase().includes(searchText);
    });
  }

}
