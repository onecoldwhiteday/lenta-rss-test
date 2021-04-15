import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { forOwn, isDate, camelCase } from 'lodash';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) {}

  public get(pathKey: string, options?: {}): Observable<any> {
    const url = environment.apiUrl + pathKey;
    return this.handleResponse(this._http.get(url, options))
  }

  handleResponse(obs: any) {
    return obs.pipe(
      map((res: any) => {
        if (res) {
          return this.camelResponse(res);
        }
        return res;
      }),

    );
  }

  private formatData(data: any, transformer: any): any {
    if (typeof data === 'object' && data !== null) {
      if (data.constructor === Array) {
        return data.map((item) => this.formatData(item, transformer));
      }

      let result: any = {};
      forOwn(data, (value, key) => {
        let trasformedValue = value;
        if (typeof value === 'object' && !isDate(value) && value !== null) {
          trasformedValue = this.formatData(value, transformer);
        }

        let newKey = transformer(key);
        result[newKey] = trasformedValue;
      });

      return result;
    } else {
      return data;
    }
  }

  camelResponse(response: any) {
    if (response.controls === Array) {
      return response.map((i: any) => this.formatData(i, camelCase));
    }
    return this.formatData(response, camelCase);
  }

}
