import { BaseEntity } from './../../shared';

export class BrandKb implements BaseEntity {
    constructor(
        public id?: number,
        public brandName?: string,
        public products?: BaseEntity[],
    ) {
    }
}
