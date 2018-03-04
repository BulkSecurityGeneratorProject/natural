/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NaturalTestModule } from '../../../test.module';
import { BrandKbDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/brand-kb/brand-kb-delete-dialog.component';
import { BrandKbService } from '../../../../../../main/webapp/app/entities/brand-kb/brand-kb.service';

describe('Component Tests', () => {

    describe('BrandKb Management Delete Component', () => {
        let comp: BrandKbDeleteDialogComponent;
        let fixture: ComponentFixture<BrandKbDeleteDialogComponent>;
        let service: BrandKbService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [BrandKbDeleteDialogComponent],
                providers: [
                    BrandKbService
                ]
            })
            .overrideTemplate(BrandKbDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BrandKbDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BrandKbService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
