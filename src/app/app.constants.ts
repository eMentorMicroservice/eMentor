import { environment, environmentRuby } from '../environments/environment';
import { ServerErrorModel } from './models/enums';

export const API_HOST = environment.apiHost;
export const API_HOST_PRIVATE = environment.apiHost;
export const API_URL_PREFIX = environment.apiPrefix;
export const RUBYAPIHOST = environmentRuby.apiHost;

export const LOCAL_STORAGE_VARIABLE = {
  is_admin: 'is_admin',
  access_token: 'access_token',
  is_logged_in: 'is_logged_in',
  user_avt: 'user_avatar',
  user_name: 'user_name',
  user_id: 'user_id',
  user_role: 'user_role'
};

export const SERVER_ERROR_MESSAGES: ServerErrorModel[] = [

];

export const LOGIN_STATUS = {
  logged_in: 'true'
};

export const DEFAULT_SETTINGS = {
  time_zone: 'SE Asia Standard Time'
};

export const REQUEST_TIMEOUT = 30000;

export const FORMAT_DATE_CONSTANT = {
  short_date_time_format: 'dd/MM/yyyy HH:mm:ss',
  short_date_format: 'dd/MM/yyyy',
  short_date_standard: 'yyyy-MM-dd'

};

export const API_ENDPOINT = {
  registerAccount: '/User/Register',
  getAllCourses: '/Course/GetCourses',
  changePassword: '/User/ChangePasscode',
  getUserProfile: '/User/GetUserProfile',
  editProfile: '/User/EditProfile',
  getHardCode: '/Home/GetHardCodes',
  uploadCourse: '/Course/UploadCourse',
  editCourse: '/Course/EditCourse',
  getCourses: '/Course/GetCourses',
  getCoursesByMentorId: '/Course/GetCourseByMentor',
  deleteCourse: '/Course/RemoveCourse',
  deleteUser: '/User/RemoveUser',
  upgradeUser: '/User/UpgradeUser',
  getAllUsers: '/User/GetAllUser',
  getUserProfileById: '/User/GetProfileById',
  addOrUpdateUserExp: '/User/AddOrEditUserExperiment'
};

export const HardCodeConst = {
  userRole: 'UserRole',
  gender: 'Gender',
  courseCategories: 'CourseType'
};

export const ADMIN_CONST = '1';

export const jsFile = [
  {
    name: 'metisMenu',
    src: '../assets/js/metisMenu.min.js'
  },
  {
    name: 'jqueryApp',
    src: '../assets/js/jquery.app.js'
  },
  {
    name: 'jqueryCore',
    src: '../assets/js/jquery.core.js'
  }
];
