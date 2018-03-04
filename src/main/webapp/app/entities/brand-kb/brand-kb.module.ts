import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NaturalSharedModule } from '../../shared';
import {
    BrandKbService,
    BrandKbPopupService,
    BrandKbComponent,
    BrandKbDetailComponent,
    BrandKbDialogComponent,
    BrandKbPopupComponent,
    BrandKbDeletePopupComponent,
    BrandKbDeleteDialogComponent,
    brandRoute,
    brandPopupRoute,
} from './';

const ENTITY_STATES = [
    ...brandRoute,
    ...brandPopupRoute,
];

@NgModule({
    imports: [
        NaturalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BrandKbComponent,
        BrandKbDetailComponent,
        BrandKbDialogComponent,
        BrandKbDeleteDialogComponent,
        BrandKbPopupComponent,
        BrandKbDeletePopupComponent,
    ],
    entryComponents: [
        BrandKbComponent,
        BrandKbDialogComponent,
        BrandKbPopupComponent,
        BrandKbDeleteDialogComponent,
        BrandKbDeletePopupComponent,
    ],
    providers: [
        BrandKbService,
        BrandKbPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NaturalBrandKbModule {}
