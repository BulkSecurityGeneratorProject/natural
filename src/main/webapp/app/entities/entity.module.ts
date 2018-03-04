import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NaturalBrandKbModule } from './brand-kb/brand-kb.module';
import { NaturalCategoryKbModule } from './category-kb/category-kb.module';
import { NaturalSubCategoryKbModule } from './sub-category-kb/sub-category-kb.module';
import { NaturalProductKbModule } from './product-kb/product-kb.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NaturalBrandKbModule,
        NaturalCategoryKbModule,
        NaturalSubCategoryKbModule,
        NaturalProductKbModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NaturalEntityModule {}
