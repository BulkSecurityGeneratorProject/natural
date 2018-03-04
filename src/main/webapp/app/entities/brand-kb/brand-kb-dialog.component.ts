import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BrandKb } from './brand-kb.model';
import { BrandKbPopupService } from './brand-kb-popup.service';
import { BrandKbService } from './brand-kb.service';

@Component({
    selector: 'jhi-brand-kb-dialog',
    templateUrl: './brand-kb-dialog.component.html'
})
export class BrandKbDialogComponent implements OnInit {

    brand: BrandKb;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private brandService: BrandKbService,
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
        if (this.brand.id !== undefined) {
            this.subscribeToSaveResponse(
                this.brandService.update(this.brand));
        } else {
            this.subscribeToSaveResponse(
                this.brandService.create(this.brand));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BrandKb>>) {
        result.subscribe((res: HttpResponse<BrandKb>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BrandKb) {
        this.eventManager.broadcast({ name: 'brandListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-brand-kb-popup',
    template: ''
})
export class BrandKbPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private brandPopupService: BrandKbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.brandPopupService
                    .open(BrandKbDialogComponent as Component, params['id']);
            } else {
                this.brandPopupService
                    .open(BrandKbDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
