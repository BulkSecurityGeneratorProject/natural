import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CategoryKbComponent } from './category-kb.component';
import { CategoryKbDetailComponent } from './category-kb-detail.component';
import { CategoryKbPopupComponent } from './category-kb-dialog.component';
import { CategoryKbDeletePopupComponent } from './category-kb-delete-dialog.component';

export const categoryRoute: Routes = [
    {
        path: 'category-kb',
        component: CategoryKbComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'category-kb/:id',
        component: CategoryKbDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-kb-new',
        component: CategoryKbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-kb/:id/edit',
        component: CategoryKbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-kb/:id/delete',
        component: CategoryKbDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
