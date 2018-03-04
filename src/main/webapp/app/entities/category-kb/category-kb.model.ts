import { BaseEntity } from './../../shared';

export class CategoryKb implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public subcategories?: BaseEntity[],
    ) {
    }
}
