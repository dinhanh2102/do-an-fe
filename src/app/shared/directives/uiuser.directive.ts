import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUiuser]'
})
export class UipermissionDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {

  }

  @Input() set appUiuser(users: any) {

    var isAuthorize = false;
    var userString = localStorage.getItem('CurrentUser');
    if (userString) {
      let userName: string;
      if (userString)
        userName = JSON.parse(userString).userName;
      if (userName != null && userName != ''  && users) {
        users.forEach(function (item: any) {
          if (!isAuthorize && userName == item) {
            isAuthorize = true;
          }
        });
      }
    }

    if (isAuthorize) {
      this.viewContainer.createEmbeddedView(this.templateRef);

    } else {
      this.viewContainer.clear();
    }
  }

}
