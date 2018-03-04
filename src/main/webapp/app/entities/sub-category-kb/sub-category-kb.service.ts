import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SubCategoryKb } from './sub-category-kb.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SubCategoryKb>;

@Injectable()
export class SubCategoryKbService {

    private resourceUrl =  SERVER_API_URL + 'api/sub-categories';

    constructor(private http: HttpClient) { }

    create(subCategory: SubCategoryKb): Observable<EntityResponseType> {
        const copy = this.convert(subCategory);
        return this.http.post<SubCategoryKb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(subCategory: SubCategoryKb): Observable<EntityResponseType> {
        const copy = this.convert(subCategory);
        return this.http.put<SubCategoryKb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SubCategoryKb>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SubCategoryKb[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubCategoryKb[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubCategoryKb[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SubCategoryKb = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SubCategoryKb[]>): HttpResponse<SubCategoryKb[]> {
        const jsonResponse: SubCategoryKb[] = res.body;
        const body: SubCategoryKb[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SubCategoryKb.
     */
    private convertItemFromServer(subCategory: SubCategoryKb): SubCategoryKb {
        const copy: SubCategoryKb = Object.assign({}, subCategory);
        return copy;
    }

    /**
     * Convert a SubCategoryKb to a JSON which can be sent to the server.
     */
    private convert(subCategory: SubCategoryKb): SubCategoryKb {
        const copy: SubCategoryKb = Object.assign({}, subCategory);
        return copy;
    }
}
