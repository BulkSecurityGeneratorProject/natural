/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NaturalTestModule } from '../../../test.module';
import { CategoryKbDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/category-kb/category-kb-delete-dialog.component';
import { CategoryKbService } from '../../../../../../main/webapp/app/entities/category-kb/category-kb.service';

describe('Component Tests', () => {

    describe('CategoryKb Management Delete Component', () => {
        let comp: CategoryKbDeleteDialogComponent;
        let fixture: ComponentFixture<CategoryKbDeleteDialogComponent>;
        let service: CategoryKbService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [CategoryKbDeleteDialogComponent],
                providers: [
                    CategoryKbService
                ]
            })
            .overrideTemplate(CategoryKbDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryKbDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryKbService);
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
