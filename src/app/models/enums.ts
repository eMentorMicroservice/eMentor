enum UserRole {
    Student = 1,
    Teacher,
    Admin
}
enum Gender {
    Male = 1,
    Female = 2,
    Other = 3
}

enum HolidayType {
    Certain = 1,
    Uncertain = 2,
    CompanySpecified = 3,
}

class ServerErrorModel {
    Key: string;
    Value: string;
}

enum SpecialDayType {
    None = 0,
    DayOff = 1,
    Holiday = 2,
    Makeup = 3,
    Weekend = 4
}

enum MaritalStatus {
    Single = 1,
    Married = 2,
    Relationship = 3,
}
enum EmployeeTypes { Officially, InterShip, Probationary };
enum WorkingStates { Offline, Working };
enum DayOffOption {
    FullDay = 1,
    Morning = 2,
    Afternoon = 3
}
enum NotifyType {
    Success,
    Info,
    Warning,
    Error
}

enum DialogStyles {
    None,
    Message,
    Input,
    ThreeOptions,
    Confirm
}

enum AlertGroups {
    Message,
    Account,
    Project,
    DayOff,
    OverTime
}

enum ColorForShow {
    DayOffFullDay = 'lightseagreen',
    DayOffHalfDay = 'yellow',
    HolidayCertain = 'yellow',
    HolidayUncertain = 'blue',
    HolidayCompany = 'green',
    Makeup = 'red',
}

export {
    UserRole, Gender, MaritalStatus, EmployeeTypes,
    WorkingStates, NotifyType, DialogStyles, AlertGroups,
    SpecialDayType, HolidayType, ColorForShow, DayOffOption, ServerErrorModel
};
