import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterbadgeclassinlist'
})
export class FilterBadgeClassInListPipe {
  transform(value:any, listargs: any[]): string {
    let className = '';
    listargs.forEach(item=>{
      if(item.Id == value){
        className = item.BadgeClass;
      }
    });

    return className;
  }
}
