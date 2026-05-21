import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil, map } from 'rxjs/operators';

import { NavigationItem } from '../navigation/navigationitem';
import { NtsNavigationService } from '../navigation/navigation.service';
import { AppSetting } from 'src/app/shared';

@Component({
    selector: 'nav-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls: ['./collapsable.component.scss']
})
export class NavCollapsableComponent implements OnInit, OnDestroy {
    @Input()
    item!: NavigationItem;

    public isOpen = false;
    public isClick = false;
    public isCollapsed = true;
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _ntsNavigationService: NtsNavigationService,
        private _router: Router,
        public appSetting: AppSetting
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Listen for router events
        this._router.events
            .pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll))
            .subscribe(e => {
                if (e instanceof NavigationEnd) {
                    // Check if the url can be found in
                    // one of the children of this item
                    if (this.isUrlInChildren(this.item, e.urlAfterRedirects)) {
                        this.expand();
                    }
                    else {
                        this.collapse();
                    }
                }
            });

        // Listen for collapsing of any navigation item
        this._ntsNavigationService.onItemCollapsed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (clickedItem) => {
                    if (clickedItem && clickedItem.children) {
                        // Check if the clicked item is one
                        // of the children of this item
                        if (this.isChildrenOf(this.item, clickedItem)) {
                            return;
                        }

                        // Check if the url can be found in
                        // one of the children of this item
                        if (this.isUrlInChildren(this.item, this._router.url)) {
                            return;
                        }

                        // If the clicked item is not this item, collapse...
                        if (this.item !== clickedItem) {
                            this.collapse();
                        }
                    }
                }
            );

        // Check if the url can be found in
        // one of the children of this item
        var temp = this.isUrlInChildren(this.item, this._router.url);
        if (this.isUrlInChildren(this.item, this._router.url)) {
            this.expand();
        }
        else {
            this.collapse();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle collapse
     *
     * @param ev
     */
    toggleOpen(ev: any): void {
        ev.preventDefault();
        this.isClick = true;
        this.isOpen = !this.isOpen;
        // Navigation collapse toggled...
        this._ntsNavigationService.onItemCollapsed.next(this.item);
        this._ntsNavigationService.onItemCollapseToggled.next();
    }

    /**
     * Expand the collapsable navigation
     */
    expand(): void {
        if (this.isOpen) {
            return;
        }

        this.isOpen = true;
        this.isCollapsed = false;
        this._ntsNavigationService.onItemCollapseToggled.next();
    }

    /**
     * Collapse the collapsable navigation
     */
    collapse(): void {
        if (!this.isOpen) {
            return;
        }

        this.isOpen = false;
        this.isCollapsed = true;
        this._ntsNavigationService.onItemCollapseToggled.next();
    }

    /**
     * Check if the given parent has the
     * given item in one of its children
     *
     * @param parent
     * @param item
     * @returns {boolean}
     */
    isChildrenOf(parent: any, item: any): boolean {
        if (!parent.children) {
            return false;
        }

        if (parent.children.indexOf(item) !== -1) {
            return true;
        }

        for (const children of parent.children) {
            if (children.children) {
                return this.isChildrenOf(children, item);
            }
        }

        return false;
    }

    /**
     * Check if the given url can be found
     * in one of the given parent's children
     *
     * @param parent
     * @param url
     * @returns {boolean}
     */
    isUrlInChildren(parent: any, url: any): boolean {
        if (!parent.children) {
            return false;
        }

        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].children) {
                if (this.isUrlInChildren(parent.children[i], url)) {
                    return true;
                }
            }

            if (parent.children[i].url && (parent.children[i].url === url || url.includes(parent.children[i].url))) {
                return true;
            }
        }

        return false;
    }

}
