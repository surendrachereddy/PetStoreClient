import {ICategory} from './category';
import {ITag} from './tag';

export interface IPet {
    "id": number;
    "category": ICategory;
    "name": string;
    "photoUrls": string[];
    "tags": ITag[];
    "status": string;
}
