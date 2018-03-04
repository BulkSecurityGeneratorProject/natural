import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BrandKb } from './brand-kb.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BrandKb>;

@Injectable()
export class BrandKbService {

    private resourceUrl =  SERVER_API_URL + 'api/brands';

    constructor(private http: HttpClient) { }

    create(brand: BrandKb): Observable<EntityResponseType> {
        const copy = this.convert(brand);
        return this.http.post<BrandKb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(brand: BrandKb): Observable<EntityResponseType> {
        const copy = this.convert(brand);
        return this.http.put<BrandKb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BrandKb>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BrandKb[]>> {
        const options = createRequestOption(req);
        return this.http.get<BrandKb[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BrandKb[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BrandKb = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BrandKb[]>): HttpResponse<BrandKb[]> {
        const jsonResponse: BrandKb[] = res.body;
        const body: BrandKb[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BrandKb.
     */
    private convertItemFromServer(brand: BrandKb): BrandKb {
        const copy: BrandKb = Object.assign({}, brand);
        return copy;
    }

    /**
     * Convert a BrandKb to a JSON which can be sent to the server.
     */
    private convert(brand: BrandKb): BrandKb {
        const copy: BrandKb = Object.assign({}, brand);
        return copy;
    }
}
