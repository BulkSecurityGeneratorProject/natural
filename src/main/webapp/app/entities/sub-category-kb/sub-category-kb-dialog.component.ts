import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubCategoryKb } from './sub-category-kb.model';
import { SubCategoryKbPopupService } from './sub-category-kb-popup.service';
import { SubCategoryKbService } from './sub-category-kb.service';
import { CategoryKb, CategoryKbService } from '../category-kb';
import { ProductKb, ProductKbService } from '../product-kb';

@Component({
    selector: 'jhi-sub-category-kb-dialog',
    templateUrl: './sub-category-kb-dialog.component.html'
})
export class SubCategoryKbDialogComponent implements OnInit {

    subCategory: SubCategoryKb;
    isSaving: boolean;

    categories: CategoryKb[];

    products: ProductKb[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private subCategoryService: SubCategoryKbService,
        private categoryService: CategoryKbService,
        private productService: ProductKbService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoryService.query()
            .subscribe((res: HttpResponse<CategoryKb[]>) => { this.categories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
            .subscribe((res: HttpResponse<ProductKb[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subCategoryService.update(this.subCategory));
        } else {
            this.subscribeToSaveResponse(
                this.subCategoryService.create(this.subCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SubCategoryKb>>) {
        result.subscribe((res: HttpResponse<SubCategoryKb>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SubCategoryKb) {
        this.eventManager.broadcast({ name: 'subCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoryById(index: number, item: CategoryKb) {
        return item.id;
    }

    trackProductById(index: number, item: ProductKb) {
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
    selector: 'jhi-sub-category-kb-popup',
    template: ''
})
export class SubCategoryKbPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subCategoryPopupService: SubCategoryKbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subCategoryPopupService
                    .open(SubCategoryKbDialogComponent as Component, params['id']);
            } else {
                this.subCategoryPopupService
                    .open(SubCategoryKbDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
