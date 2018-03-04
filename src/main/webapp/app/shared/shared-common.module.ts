import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/hi';

import {
    NaturalSharedLibsModule,
    JhiLanguageHelper,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        NaturalSharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'hi'
        },
    ],
    exports: [
        NaturalSharedLibsModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class NaturalSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
