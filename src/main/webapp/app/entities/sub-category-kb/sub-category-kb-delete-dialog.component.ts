import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubCategoryKb } from './sub-category-kb.model';
import { SubCategoryKbPopupService } from './sub-category-kb-popup.service';
import { SubCategoryKbService } from './sub-category-kb.service';

@Component({
    selector: 'jhi-sub-category-kb-delete-dialog',
    templateUrl: './sub-category-kb-delete-dialog.component.html'
})
export class SubCategoryKbDeleteDialogComponent {

    subCategory: SubCategoryKb;

    constructor(
        private subCategoryService: SubCategoryKbService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'subCategoryListModification',
                content: 'Deleted an subCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sub-category-kb-delete-popup',
    template: ''
})
export class SubCategoryKbDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subCategoryPopupService: SubCategoryKbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subCategoryPopupService
                .open(SubCategoryKbDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
