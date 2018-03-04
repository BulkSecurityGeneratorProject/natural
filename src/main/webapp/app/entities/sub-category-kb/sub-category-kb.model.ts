import { BaseEntity } from './../../shared';

export class SubCategoryKb implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public isNatural?: boolean,
        public category?: BaseEntity,
        public products?: BaseEntity[],
    ) {
        this.isNatural = false;
    }
}
