import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[disUipermission]'
})
export class DiablePermissionDirective {

  private _el: HTMLElement;

  constructor(el: ElementRef) {
    this._el = el.nativeElement;
  }

  @Input() set disUipermission(permission: any) {

    var isAuthorize = false;
    var user = localStorage.getItem('CurrentUser');
    var listPermission: any[] = [];
    if (user) {
      let userString = localStorage.getItem('CurrentUser');
      var listPermission: any[] = [];
      if (userString)
        listPermission = JSON.parse(userString).permissions;
      if (listPermission != null && listPermission.length > 0 && permission) {
        permission.forEach(function (item: any) {
          if (!isAuthorize && listPermission.indexOf(item) != -1) {
            isAuthorize = true;
          }
        });
      }
    }

    if (!permission || permission.length == 0) {
      isAuthorize = true;
    }

    if (!isAuthorize) {
      this._el.classList.add('disabled');
    }
  }

}
