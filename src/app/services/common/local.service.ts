import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_VARIABLE } from '../../app.constants';

export class LocalService {
  static getItem(key: string) {
    return localStorage.getItem(key);
  }

  static setItem(key: string, value: any) {
    return localStorage.setItem(key, value);
  }

  static removeItem(key: string) {
    return localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }

  static logout() {

    LocalService.clear();
  }

  static getAccessToken() {
    return LocalService.getItem(LOCAL_STORAGE_VARIABLE.access_token);
  }

  static setAccessToken(accessToken) {
    LocalService.setItem(LOCAL_STORAGE_VARIABLE.access_token, accessToken);
  }

  static setUserAvt(avt: string) {
    LocalService.setItem(LOCAL_STORAGE_VARIABLE.user_avt, avt);
  }

  static getUserAvt(): string {
    return LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_avt);
  }

  static getLogStatus() {
    return LocalService.getItem(LOCAL_STORAGE_VARIABLE.is_logged_in);
  }

  static setLogStatus(bool) {
    LocalService.setItem(LOCAL_STORAGE_VARIABLE.is_logged_in, bool);
  }
  static getIsAdminState() {
    return LocalService.getItem(LOCAL_STORAGE_VARIABLE.is_admin);
  }

  static setIsAdminState(isAdmin: boolean) {
    LocalService.setItem(LOCAL_STORAGE_VARIABLE.is_admin, isAdmin);
  }

  
  static setUserName(name: string) {
    LocalService.setItem(LOCAL_STORAGE_VARIABLE.user_name, name);
  }

  static getUserName() {
    return LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_name);
  }

  static setUserId(id: number) {
    LocalService.setItem(LOCAL_STORAGE_VARIABLE.user_id, id);
  }

  static getUserId(): number {
    return parseInt(LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_id));
  }

}
