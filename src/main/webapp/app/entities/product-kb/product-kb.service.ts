import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductKb } from './product-kb.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductKb>;

@Injectable()
export class ProductKbService {

    private resourceUrl =  SERVER_API_URL + 'api/products';

    constructor(private http: HttpClient) { }

    create(product: ProductKb): Observable<EntityResponseType> {
        const copy = this.convert(product);
        return this.http.post<ProductKb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(product: ProductKb): Observable<EntityResponseType> {
        const copy = this.convert(product);
        return this.http.put<ProductKb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductKb>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductKb[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductKb[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductKb[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductKb = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductKb[]>): HttpResponse<ProductKb[]> {
        const jsonResponse: ProductKb[] = res.body;
        const body: ProductKb[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductKb.
     */
    private convertItemFromServer(product: ProductKb): ProductKb {
        const copy: ProductKb = Object.assign({}, product);
        return copy;
    }

    /**
     * Convert a ProductKb to a JSON which can be sent to the server.
     */
    private convert(product: ProductKb): ProductKb {
        const copy: ProductKb = Object.assign({}, product);
        return copy;
    }
}
