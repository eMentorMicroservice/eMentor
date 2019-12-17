import { UserModel } from './user.model';

export class CourseModel {
    id: number;
    name: string;
    description: string;
    owner: UserModel;
    ownerId: number;
    availableTime: string;
    courseCategory: string;
    courseImage: string;
}
export class UploadCourseModel {
    name: string;
    description: string;
    courseImage: string;
    uploadedImage: File;
    courseCategory: number;
    availableTime: string;
}
