import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoryKb } from './category-kb.model';
import { CategoryKbPopupService } from './category-kb-popup.service';
import { CategoryKbService } from './category-kb.service';

@Component({
    selector: 'jhi-category-kb-delete-dialog',
    templateUrl: './category-kb-delete-dialog.component.html'
})
export class CategoryKbDeleteDialogComponent {

    category: CategoryKb;

    constructor(
        private categoryService: CategoryKbService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoryListModification',
                content: 'Deleted an category'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-category-kb-delete-popup',
    template: ''
})
export class CategoryKbDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryKbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoryPopupService
                .open(CategoryKbDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
