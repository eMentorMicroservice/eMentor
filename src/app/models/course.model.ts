import { UserModel } from './user.model';
import { DropdownModel } from './dropdown.model';

export class CourseModel {
    constructor() {
        this.categoryModel = new DropdownModel();
    }

    id: number;
    name: string;
    description: string;
    owner: UserModel;
    ownerId: number;
    availableFrom: string;
    availableTo: string;
    courseCategory: string;
    courseImage: string;
    categoryModel: DropdownModel;
    courseFee: number;
}
export class UploadCourseModel {
    constructor() {
        this.categoryModel = new DropdownModel();
    }
    name: string;
    description: string;
    courseImage: string;
    uploadedImage: File;
    courseCategory: number;
    availableFrom: string;
    availableTo: string;
    categoryModel: DropdownModel;
    id: number;
    courseFee: number;
}
