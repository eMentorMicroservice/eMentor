import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { GlobalService } from '../global.service';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import { shareReplay, timeout, catchError } from 'rxjs/operators';
import { LocalService } from './local.service';
import { Observable } from 'rxjs';
import { API_HOST, API_URL_PREFIX, REQUEST_TIMEOUT } from '../../app.constants';
declare var require: any;

@Injectable()
export class BaseService {
  static defaultHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Max-Age': '3600',
  };
  static formdataHeader = {
    'enctype': 'multipart/form-data'
  };
  private caches = {};
  protected apiHost = API_HOST;
  protected apiUrlPrefix = API_URL_PREFIX;

  protected headers: HttpHeaders;

  public createAPIURL(path: string): string {
    return this.apiHost + this.apiUrlPrefix + path;
  }

  constructor(protected http: HttpClient,
    protected errorHandler: ErrorService,
    protected globalService: GlobalService) {
    this.headers = new HttpHeaders(BaseService.defaultHeader);
  }

  public get(url: string, params?: HttpParams | any, loader = true, cache = false): Observable<Object | any> {
    this.loadToken();

    if (cache && this.caches[url]) {
      if (loader) {
        this.globalService.loading();
      }
      return this.caches[url];
    }

    const fullUrl = this.createAPIURL(url);
    let request: Observable<Object>;
    if (loader) {
      this.globalService.loading();
      request = this.http.get(fullUrl, { headers: this.headers, params: params })
        .pipe(shareReplay(1),
          timeout(REQUEST_TIMEOUT)
        )
        .catch(error => {
          return this.errorHandler.handleError(error);
        })
        .finally(() => {
          this.globalService.loaded();
        });
    } else {
      request = this.http.get(fullUrl, { headers: this.headers, params: params })
        .pipe(shareReplay(1),
          timeout(REQUEST_TIMEOUT))
        .catch(error => this.errorHandler.handleError(error));
    }

    if (cache) {
      this.caches[url] = request;
    }
    return request;
  }

  download(url: string, fileName: string, param: {} | any) {
    this.getBlob(url, param)
      .subscribe(blob => {
        var FileSaver = require('file-saver');
        FileSaver.saveAs(blob, fileName);
      }, error => {
        console.log("download errror")
      })
  }

  getBlob(url: string, param: {} | any): Observable<Object | any> {
    const fullUrl = this.createAPIURL(url);
    this.globalService.loading();
    let option: {};

    if (param)
      option = { headers: this.headers, params: param, responseType: 'blob' as 'json' };
    else
      option = { headers: this.headers, responseType: 'blob' as 'json' };

    let res = this.http.get<Blob>(fullUrl, option)
      .pipe(shareReplay(1),
        timeout(REQUEST_TIMEOUT)
      ).catch(error => {
        return this.errorHandler.handleError(error);
      })
      .finally(() => {
        this.globalService.loaded();
      });
    return res;
  }



  public post(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
    this.loadToken();
    const fullUrl = this.createAPIURL(url);
    if (loader) {
      this.globalService.loading();
      return this.http.post(fullUrl, params, { headers: this.headers })
        .pipe(timeout(REQUEST_TIMEOUT))
        .catch(error => {
          return this.errorHandler.handleError(error);
        })
        .finally(() => {
          this.globalService.loaded();
        });
    } else {
      return this.http.post(fullUrl, params, { headers: this.headers })
        .pipe(timeout(REQUEST_TIMEOUT))
        .catch(error => this.errorHandler.handleError(error));
    }
  }

  public put(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
    this.loadToken();

    const fullUrl = this.createAPIURL(url);
    if (loader) {
      this.globalService.loading();
      return this.http.put(fullUrl, params, { headers: this.headers })
        .pipe(timeout(REQUEST_TIMEOUT))
        .catch(error => {
          return this.errorHandler.handleError(error);
        })
        .finally(() => {
          this.globalService.loaded();
        });
    } else {
      return this.http.put(fullUrl, params, { headers: this.headers })
        .pipe(timeout(REQUEST_TIMEOUT))
        .catch(error => this.errorHandler.handleError(error));
    }
  }

  public remove(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
    this.loadToken();

    const fullUrl = this.createAPIURL(url);
    if (loader) {
      this.globalService.loading();
      return this.http.request('delete', fullUrl, { headers: this.headers, body: params })
        .pipe(timeout(REQUEST_TIMEOUT))
        .catch(error => {
          return this.errorHandler.handleError(error);
        })
        .finally(() => {
          this.globalService.loaded();
        });
    } else {
      return this.http.request('delete', fullUrl, { headers: this.headers, body: params })
        .pipe(timeout(REQUEST_TIMEOUT))
        .catch(error => this.errorHandler.handleError(error));
    }
  }

  protected putFormData(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {

    this.loadToken(true);

    const body = this.parseFormdata(params);
    const fullUrl = this.createAPIURL(url);
    if (!loader) {
      this.globalService.loading();
      return this.http.put(fullUrl, body, { headers: this.headers })
        .pipe(timeout(REQUEST_TIMEOUT))
        .catch(error => {
          return this.errorHandler.handleError(error);
        })
        .finally(() => {
          this.globalService.loaded();
        });
    } else {
      return this.http.put(fullUrl, body, { headers: this.headers })
        .pipe(timeout(REQUEST_TIMEOUT))
        .catch(error => this.errorHandler.handleError(error));
    }
  }

  public postFormData(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
    this.loadToken(true);
    const body = this.parseFormdata(params);
    const fullUrl = this.createAPIURL(url);

    if (loader) {
      this.globalService.loading();
      return this.http.post(fullUrl, body, { headers: this.headers })
        .catch(error => {
          return this.errorHandler.handleError(error);
        })
        .finally(() => {
          this.globalService.loaded();
        });
    } else {
      return this.http.post(fullUrl, body, { headers: this.headers })
        .catch(error => this.errorHandler.handleError(error));
    }
  }

  private loadToken(isForm: boolean = false) {

    const token = LocalService.getAccessToken();

    if (token == '' || !token) {
      this.headers = new HttpHeaders(isForm ? BaseService.formdataHeader : BaseService.defaultHeader);
    }
    else {
      this.headers = new HttpHeaders({
        ...isForm ? BaseService.formdataHeader : BaseService.defaultHeader,
        ...{ 'Authorization': `Bearer ${token}` }
      });
    }
  }

  private parseFormdata(model: any) {
    const formdata = new FormData();
    Object.keys(model || {}).forEach(p => {
      if (model[p]) {
        if (Array.isArray(model[p])) {
          (model[p] as Array<any>).forEach(q => {
            formdata.append(p + '[]', q);
          });
        } else {
          formdata.append(p, model[p]);
        }
      }
    });

    return formdata;
  }
}
