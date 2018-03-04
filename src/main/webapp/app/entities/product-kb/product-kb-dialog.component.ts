import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ProductKb } from './product-kb.model';
import { ProductKbPopupService } from './product-kb-popup.service';
import { ProductKbService } from './product-kb.service';
import { SubCategoryKb, SubCategoryKbService } from '../sub-category-kb';
import { BrandKb, BrandKbService } from '../brand-kb';

@Component({
    selector: 'jhi-product-kb-dialog',
    templateUrl: './product-kb-dialog.component.html'
})
export class ProductKbDialogComponent implements OnInit {

    product: ProductKb;
    isSaving: boolean;

    subcategories: SubCategoryKb[];

    brands: BrandKb[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private productService: ProductKbService,
        private subCategoryService: SubCategoryKbService,
        private brandService: BrandKbService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.subCategoryService.query()
            .subscribe((res: HttpResponse<SubCategoryKb[]>) => { this.subcategories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.brandService.query()
            .subscribe((res: HttpResponse<BrandKb[]>) => { this.brands = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.product, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(
                this.productService.create(this.product));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductKb>>) {
        result.subscribe((res: HttpResponse<ProductKb>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductKb) {
        this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSubCategoryById(index: number, item: SubCategoryKb) {
        return item.id;
    }

    trackBrandById(index: number, item: BrandKb) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-product-kb-popup',
    template: ''
})
export class ProductKbPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductKbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productPopupService
                    .open(ProductKbDialogComponent as Component, params['id']);
            } else {
                this.productPopupService
                    .open(ProductKbDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
