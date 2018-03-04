import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SubCategoryKbComponent } from './sub-category-kb.component';
import { SubCategoryKbDetailComponent } from './sub-category-kb-detail.component';
import { SubCategoryKbPopupComponent } from './sub-category-kb-dialog.component';
import { SubCategoryKbDeletePopupComponent } from './sub-category-kb-delete-dialog.component';

export const subCategoryRoute: Routes = [
    {
        path: 'sub-category-kb',
        component: SubCategoryKbComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.subCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sub-category-kb/:id',
        component: SubCategoryKbDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.subCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subCategoryPopupRoute: Routes = [
    {
        path: 'sub-category-kb-new',
        component: SubCategoryKbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.subCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sub-category-kb/:id/edit',
        component: SubCategoryKbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.subCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sub-category-kb/:id/delete',
        component: SubCategoryKbDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'naturalApp.subCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
