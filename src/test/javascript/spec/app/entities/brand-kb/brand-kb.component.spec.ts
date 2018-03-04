/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NaturalTestModule } from '../../../test.module';
import { BrandKbComponent } from '../../../../../../main/webapp/app/entities/brand-kb/brand-kb.component';
import { BrandKbService } from '../../../../../../main/webapp/app/entities/brand-kb/brand-kb.service';
import { BrandKb } from '../../../../../../main/webapp/app/entities/brand-kb/brand-kb.model';

describe('Component Tests', () => {

    describe('BrandKb Management Component', () => {
        let comp: BrandKbComponent;
        let fixture: ComponentFixture<BrandKbComponent>;
        let service: BrandKbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [BrandKbComponent],
                providers: [
                    BrandKbService
                ]
            })
            .overrideTemplate(BrandKbComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BrandKbComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BrandKbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BrandKb(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.brands[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
