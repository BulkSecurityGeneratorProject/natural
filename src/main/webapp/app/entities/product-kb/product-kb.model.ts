import { BaseEntity } from './../../shared';

export const enum Size {
    'S',
    'M',
    'L'
}

export class ProductKb implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public imageContentType?: string,
        public image?: any,
        public price?: number,
        public size?: Size,
        public subcategories?: BaseEntity[],
        public brand?: BaseEntity,
    ) {
    }
}
