import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BrandKb } from './brand-kb.model';
import { BrandKbService } from './brand-kb.service';

@Component({
    selector: 'jhi-brand-kb-detail',
    templateUrl: './brand-kb-detail.component.html'
})
export class BrandKbDetailComponent implements OnInit, OnDestroy {

    brand: BrandKb;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private brandService: BrandKbService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBrands();
    }

    load(id) {
        this.brandService.find(id)
            .subscribe((brandResponse: HttpResponse<BrandKb>) => {
                this.brand = brandResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBrands() {
        this.eventSubscriber = this.eventManager.subscribe(
            'brandListModification',
            (response) => this.load(this.brand.id)
        );
    }
}
