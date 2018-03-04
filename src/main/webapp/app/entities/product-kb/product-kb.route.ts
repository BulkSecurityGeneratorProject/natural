import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductKbComponent } from './product-kb.component';
import { ProductKbDetailComponent } from './product-kb-detail.component';
import { ProductKbPopupComponent } from './product-kb-dialog.component';
import { ProductKbDeletePopupComponent } from './product-kb-delete-dialog.component';

export const productRoute: Routes = [
    {
        path: 'product-kb',
        component: ProductKbComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-kb/:id',
        component: ProductKbDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-kb-new',
        component: ProductKbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-kb/:id/edit',
        component: ProductKbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-kb/:id/delete',
        component: ProductKbDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
