/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NaturalTestModule } from '../../../test.module';
import { SubCategoryKbComponent } from '../../../../../../main/webapp/app/entities/sub-category-kb/sub-category-kb.component';
import { SubCategoryKbService } from '../../../../../../main/webapp/app/entities/sub-category-kb/sub-category-kb.service';
import { SubCategoryKb } from '../../../../../../main/webapp/app/entities/sub-category-kb/sub-category-kb.model';

describe('Component Tests', () => {

    describe('SubCategoryKb Management Component', () => {
        let comp: SubCategoryKbComponent;
        let fixture: ComponentFixture<SubCategoryKbComponent>;
        let service: SubCategoryKbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [SubCategoryKbComponent],
                providers: [
                    SubCategoryKbService
                ]
            })
            .overrideTemplate(SubCategoryKbComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubCategoryKbComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubCategoryKbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SubCategoryKb(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subCategories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
