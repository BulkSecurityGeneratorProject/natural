import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NaturalSharedModule } from '../../shared';
import {
    CategoryKbService,
    CategoryKbPopupService,
    CategoryKbComponent,
    CategoryKbDetailComponent,
    CategoryKbDialogComponent,
    CategoryKbPopupComponent,
    CategoryKbDeletePopupComponent,
    CategoryKbDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoryRoute,
    ...categoryPopupRoute,
];

@NgModule({
    imports: [
        NaturalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CategoryKbComponent,
        CategoryKbDetailComponent,
        CategoryKbDialogComponent,
        CategoryKbDeleteDialogComponent,
        CategoryKbPopupComponent,
        CategoryKbDeletePopupComponent,
    ],
    entryComponents: [
        CategoryKbComponent,
        CategoryKbDialogComponent,
        CategoryKbPopupComponent,
        CategoryKbDeleteDialogComponent,
        CategoryKbDeletePopupComponent,
    ],
    providers: [
        CategoryKbService,
        CategoryKbPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NaturalCategoryKbModule {}
