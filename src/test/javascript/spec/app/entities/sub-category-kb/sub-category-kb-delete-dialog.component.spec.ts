/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NaturalTestModule } from '../../../test.module';
import { SubCategoryKbDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/sub-category-kb/sub-category-kb-delete-dialog.component';
import { SubCategoryKbService } from '../../../../../../main/webapp/app/entities/sub-category-kb/sub-category-kb.service';

describe('Component Tests', () => {

    describe('SubCategoryKb Management Delete Component', () => {
        let comp: SubCategoryKbDeleteDialogComponent;
        let fixture: ComponentFixture<SubCategoryKbDeleteDialogComponent>;
        let service: SubCategoryKbService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [SubCategoryKbDeleteDialogComponent],
                providers: [
                    SubCategoryKbService
                ]
            })
            .overrideTemplate(SubCategoryKbDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubCategoryKbDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubCategoryKbService);
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
