import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BrandKb } from './brand-kb.model';
import { BrandKbPopupService } from './brand-kb-popup.service';
import { BrandKbService } from './brand-kb.service';

@Component({
    selector: 'jhi-brand-kb-delete-dialog',
    templateUrl: './brand-kb-delete-dialog.component.html'
})
export class BrandKbDeleteDialogComponent {

    brand: BrandKb;

    constructor(
        private brandService: BrandKbService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.brandService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'brandListModification',
                content: 'Deleted an brand'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-brand-kb-delete-popup',
    template: ''
})
export class BrandKbDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private brandPopupService: BrandKbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.brandPopupService
                .open(BrandKbDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
