export class UserModel {
    avatar: string;
    email: string;
    fullName: string;
    gender: number;
    id: number;
    userId: number;
    rating: number;
    role: number;
    phone: string;
    userName: string;
    address: string;
    dateOfBirth: string;
    linkedSite: string;
    uploadedFile: File;
    follower: number;
    bio: string;
    location: string;
    strength: string;
    languages: string;
    exp: UserExperienceModels;
}

export class UserExperienceModels {
    userExperienceModel: UserExperienceModel[] = [];
    counter: number;
}

export class UserExperienceModel {
    id = 0;
    jobTitle = '';
    companySite = '';
    time = '';
    description = '';
}
