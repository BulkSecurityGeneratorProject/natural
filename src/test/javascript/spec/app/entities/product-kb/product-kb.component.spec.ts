/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NaturalTestModule } from '../../../test.module';
import { ProductKbComponent } from '../../../../../../main/webapp/app/entities/product-kb/product-kb.component';
import { ProductKbService } from '../../../../../../main/webapp/app/entities/product-kb/product-kb.service';
import { ProductKb } from '../../../../../../main/webapp/app/entities/product-kb/product-kb.model';

describe('Component Tests', () => {

    describe('ProductKb Management Component', () => {
        let comp: ProductKbComponent;
        let fixture: ComponentFixture<ProductKbComponent>;
        let service: ProductKbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [ProductKbComponent],
                providers: [
                    ProductKbService
                ]
            })
            .overrideTemplate(ProductKbComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductKbComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductKbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductKb(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.products[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
