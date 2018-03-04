import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SubCategoryKb } from './sub-category-kb.model';
import { SubCategoryKbService } from './sub-category-kb.service';

@Component({
    selector: 'jhi-sub-category-kb-detail',
    templateUrl: './sub-category-kb-detail.component.html'
})
export class SubCategoryKbDetailComponent implements OnInit, OnDestroy {

    subCategory: SubCategoryKb;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subCategoryService: SubCategoryKbService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubCategories();
    }

    load(id) {
        this.subCategoryService.find(id)
            .subscribe((subCategoryResponse: HttpResponse<SubCategoryKb>) => {
                this.subCategory = subCategoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subCategoryListModification',
            (response) => this.load(this.subCategory.id)
        );
    }
}
