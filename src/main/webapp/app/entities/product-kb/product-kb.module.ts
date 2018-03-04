import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NaturalSharedModule } from '../../shared';
import {
    ProductKbService,
    ProductKbPopupService,
    ProductKbComponent,
    ProductKbDetailComponent,
    ProductKbDialogComponent,
    ProductKbPopupComponent,
    ProductKbDeletePopupComponent,
    ProductKbDeleteDialogComponent,
    productRoute,
    productPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];

@NgModule({
    imports: [
        NaturalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductKbComponent,
        ProductKbDetailComponent,
        ProductKbDialogComponent,
        ProductKbDeleteDialogComponent,
        ProductKbPopupComponent,
        ProductKbDeletePopupComponent,
    ],
    entryComponents: [
        ProductKbComponent,
        ProductKbDialogComponent,
        ProductKbPopupComponent,
        ProductKbDeleteDialogComponent,
        ProductKbDeletePopupComponent,
    ],
    providers: [
        ProductKbService,
        ProductKbPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NaturalProductKbModule {}
