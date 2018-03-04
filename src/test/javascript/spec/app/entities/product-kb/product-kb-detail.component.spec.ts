/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NaturalTestModule } from '../../../test.module';
import { ProductKbDetailComponent } from '../../../../../../main/webapp/app/entities/product-kb/product-kb-detail.component';
import { ProductKbService } from '../../../../../../main/webapp/app/entities/product-kb/product-kb.service';
import { ProductKb } from '../../../../../../main/webapp/app/entities/product-kb/product-kb.model';

describe('Component Tests', () => {

    describe('ProductKb Management Detail Component', () => {
        let comp: ProductKbDetailComponent;
        let fixture: ComponentFixture<ProductKbDetailComponent>;
        let service: ProductKbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [ProductKbDetailComponent],
                providers: [
                    ProductKbService
                ]
            })
            .overrideTemplate(ProductKbDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductKbDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductKbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductKb(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.product).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
