/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NaturalTestModule } from '../../../test.module';
import { SubCategoryKbDetailComponent } from '../../../../../../main/webapp/app/entities/sub-category-kb/sub-category-kb-detail.component';
import { SubCategoryKbService } from '../../../../../../main/webapp/app/entities/sub-category-kb/sub-category-kb.service';
import { SubCategoryKb } from '../../../../../../main/webapp/app/entities/sub-category-kb/sub-category-kb.model';

describe('Component Tests', () => {

    describe('SubCategoryKb Management Detail Component', () => {
        let comp: SubCategoryKbDetailComponent;
        let fixture: ComponentFixture<SubCategoryKbDetailComponent>;
        let service: SubCategoryKbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [SubCategoryKbDetailComponent],
                providers: [
                    SubCategoryKbService
                ]
            })
            .overrideTemplate(SubCategoryKbDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubCategoryKbDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubCategoryKbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SubCategoryKb(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subCategory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
