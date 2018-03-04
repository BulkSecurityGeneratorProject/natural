import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CategoryKb } from './category-kb.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CategoryKb>;

@Injectable()
export class CategoryKbService {

    private resourceUrl =  SERVER_API_URL + 'api/categories';

    constructor(private http: HttpClient) { }

    create(category: CategoryKb): Observable<EntityResponseType> {
        const copy = this.convert(category);
        return this.http.post<CategoryKb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(category: CategoryKb): Observable<EntityResponseType> {
        const copy = this.convert(category);
        return this.http.put<CategoryKb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CategoryKb>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CategoryKb[]>> {
        const options = createRequestOption(req);
        return this.http.get<CategoryKb[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CategoryKb[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CategoryKb = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CategoryKb[]>): HttpResponse<CategoryKb[]> {
        const jsonResponse: CategoryKb[] = res.body;
        const body: CategoryKb[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CategoryKb.
     */
    private convertItemFromServer(category: CategoryKb): CategoryKb {
        const copy: CategoryKb = Object.assign({}, category);
        return copy;
    }

    /**
     * Convert a CategoryKb to a JSON which can be sent to the server.
     */
    private convert(category: CategoryKb): CategoryKb {
        const copy: CategoryKb = Object.assign({}, category);
        return copy;
    }
}
