import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../common/auth.service';
import { EnumModel } from '../models/enum.model';

@Directive({ selector: '[permission]' })
export class PermissionDirective implements OnInit, OnDestroy {

  subscription = new Subject();

  permissionList: EnumModel[] = [];
  @Input() set permission(enumList: EnumModel[]) {
    this.permissionList = enumList;
  };

  constructor(
    private auth: AuthService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<EnumModel>,
  ) { }

  ngOnInit(): void {
    // if (this.auth.user && this.auth.user.role && this.auth.user.role.id) {
    // this.auth.userObservable.subscribe(res => {
    if (this.auth.user && this.auth.user.role && this.auth.user.role.id) {
      const permissions = [...this.permissionList.map(data => data.id)];
      if (permissions.indexOf(this.auth.user.role.id) !== -1) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else { this.viewContainer.clear(); }
    }
    // });
    // }
  }

  ngOnDestroy(): void {
    this.subscription.next(null);
    this.subscription.complete();
  }

}
