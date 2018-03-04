import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoryKb } from './category-kb.model';
import { CategoryKbPopupService } from './category-kb-popup.service';
import { CategoryKbService } from './category-kb.service';

@Component({
    selector: 'jhi-category-kb-dialog',
    templateUrl: './category-kb-dialog.component.html'
})
export class CategoryKbDialogComponent implements OnInit {

    category: CategoryKb;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private categoryService: CategoryKbService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoryService.update(this.category));
        } else {
            this.subscribeToSaveResponse(
                this.categoryService.create(this.category));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CategoryKb>>) {
        result.subscribe((res: HttpResponse<CategoryKb>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CategoryKb) {
        this.eventManager.broadcast({ name: 'categoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-category-kb-popup',
    template: ''
})
export class CategoryKbPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryKbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoryPopupService
                    .open(CategoryKbDialogComponent as Component, params['id']);
            } else {
                this.categoryPopupService
                    .open(CategoryKbDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
