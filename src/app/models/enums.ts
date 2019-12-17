enum UserRole {
    Admin = 1,
    Teacher,
    Student
}
enum Gender {
    Male = 1,
    Female = 2,
    Other = 3
}

class ServerErrorModel {
    Key: string;
    Value: string;
}

enum OnlineState {
    Offline,
    Online
}

enum NotifyType {
    Success,
    Info,
    Warning,
    Error
}

enum CourseCategories {

}

export {
    UserRole,
    Gender,
    OnlineState,
    NotifyType,
    ServerErrorModel,
    CourseCategories
};
