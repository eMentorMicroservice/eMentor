import { UserModel } from './user.model';

export class CourseModel {
    description: string;
    id: number;
    name: string;
    owner: UserModel;
    ownerId: number;
}
