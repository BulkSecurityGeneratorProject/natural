import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NaturalSharedModule } from '../../shared';
import {
    SubCategoryKbService,
    SubCategoryKbPopupService,
    SubCategoryKbComponent,
    SubCategoryKbDetailComponent,
    SubCategoryKbDialogComponent,
    SubCategoryKbPopupComponent,
    SubCategoryKbDeletePopupComponent,
    SubCategoryKbDeleteDialogComponent,
    subCategoryRoute,
    subCategoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...subCategoryRoute,
    ...subCategoryPopupRoute,
];

@NgModule({
    imports: [
        NaturalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubCategoryKbComponent,
        SubCategoryKbDetailComponent,
        SubCategoryKbDialogComponent,
        SubCategoryKbDeleteDialogComponent,
        SubCategoryKbPopupComponent,
        SubCategoryKbDeletePopupComponent,
    ],
    entryComponents: [
        SubCategoryKbComponent,
        SubCategoryKbDialogComponent,
        SubCategoryKbPopupComponent,
        SubCategoryKbDeleteDialogComponent,
        SubCategoryKbDeletePopupComponent,
    ],
    providers: [
        SubCategoryKbService,
        SubCategoryKbPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NaturalSubCategoryKbModule {}
