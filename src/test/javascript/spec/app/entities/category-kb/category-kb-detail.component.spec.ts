/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NaturalTestModule } from '../../../test.module';
import { CategoryKbDetailComponent } from '../../../../../../main/webapp/app/entities/category-kb/category-kb-detail.component';
import { CategoryKbService } from '../../../../../../main/webapp/app/entities/category-kb/category-kb.service';
import { CategoryKb } from '../../../../../../main/webapp/app/entities/category-kb/category-kb.model';

describe('Component Tests', () => {

    describe('CategoryKb Management Detail Component', () => {
        let comp: CategoryKbDetailComponent;
        let fixture: ComponentFixture<CategoryKbDetailComponent>;
        let service: CategoryKbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [CategoryKbDetailComponent],
                providers: [
                    CategoryKbService
                ]
            })
            .overrideTemplate(CategoryKbDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryKbDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryKbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CategoryKb(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.category).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
