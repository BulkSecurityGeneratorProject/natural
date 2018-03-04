import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BrandKbComponent } from './brand-kb.component';
import { BrandKbDetailComponent } from './brand-kb-detail.component';
import { BrandKbPopupComponent } from './brand-kb-dialog.component';
import { BrandKbDeletePopupComponent } from './brand-kb-delete-dialog.component';

export const brandRoute: Routes = [
    {
        path: 'brand-kb',
        component: BrandKbComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.brand.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'brand-kb/:id',
        component: BrandKbDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.brand.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const brandPopupRoute: Routes = [
    {
        path: 'brand-kb-new',
        component: BrandKbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.brand.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'brand-kb/:id/edit',
        component: BrandKbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.brand.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'brand-kb/:id/delete',
        component: BrandKbDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.brand.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
