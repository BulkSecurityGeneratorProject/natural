/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NaturalTestModule } from '../../../test.module';
import { BrandKbDetailComponent } from '../../../../../../main/webapp/app/entities/brand-kb/brand-kb-detail.component';
import { BrandKbService } from '../../../../../../main/webapp/app/entities/brand-kb/brand-kb.service';
import { BrandKb } from '../../../../../../main/webapp/app/entities/brand-kb/brand-kb.model';

describe('Component Tests', () => {

    describe('BrandKb Management Detail Component', () => {
        let comp: BrandKbDetailComponent;
        let fixture: ComponentFixture<BrandKbDetailComponent>;
        let service: BrandKbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [BrandKbDetailComponent],
                providers: [
                    BrandKbService
                ]
            })
            .overrideTemplate(BrandKbDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BrandKbDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BrandKbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BrandKb(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.brand).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
