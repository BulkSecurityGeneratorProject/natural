/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NaturalTestModule } from '../../../test.module';
import { CategoryKbComponent } from '../../../../../../main/webapp/app/entities/category-kb/category-kb.component';
import { CategoryKbService } from '../../../../../../main/webapp/app/entities/category-kb/category-kb.service';
import { CategoryKb } from '../../../../../../main/webapp/app/entities/category-kb/category-kb.model';

describe('Component Tests', () => {

    describe('CategoryKb Management Component', () => {
        let comp: CategoryKbComponent;
        let fixture: ComponentFixture<CategoryKbComponent>;
        let service: CategoryKbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [CategoryKbComponent],
                providers: [
                    CategoryKbService
                ]
            })
            .overrideTemplate(CategoryKbComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryKbComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryKbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CategoryKb(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.categories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
