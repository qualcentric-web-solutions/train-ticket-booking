import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Constant } from '../constant-url/constant';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  baseUrl: string;
  constructor(public httpClient: HttpClient, public constant: Constant) {
    this.baseUrl = constant.baseUrl
  }

  httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer adad'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
    } else if (error.status == 404) {
      return throwError(error.error.msg);
      //return throwError(error.message);
    } else if (error.status === 400) {
      return throwError(error.error.msg);
    } else if (error.status === 500) {
      return throwError(error.error.msg);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  // Call API Method
  /** Get Method */
  getMethod(enobject: any, endUrl: any): Observable<any> {
      return this.httpClient
        .get<any>(this.baseUrl + endUrl)
        .pipe(
          catchError(this.handleError)
        )
    }
     /** Post Method */
  postMethod(object: any, endUrl: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + endUrl, object)
      .pipe(
        catchError(this.handleError)
      )
  }

}
