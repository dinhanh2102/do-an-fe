import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUipermission]'
})
export class UipermissionDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {

  }

  @Input() set appUipermission(permission: any) {

    var isAuthorize = false;
    var userString = localStorage.getItem('CurrentUser');
    if (userString) {
      var listPermission: any[] = [];
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

    if (isAuthorize) {
      this.viewContainer.createEmbeddedView(this.templateRef);

    } else {
      this.viewContainer.clear();
    }
  }

}
