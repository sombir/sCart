import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  private baseUrl = "https://xebiascart.herokuapp.com";

  constructor(private http: HttpClient) {

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getProductList() {
    return this.http.get(this.baseUrl+"/products")
    .pipe(catchError(this.handleError));
  }

  getProductFilters() {
    return this.http.get(this.baseUrl+"/filters")
    .pipe(catchError(this.handleError));
  }

  getProductByName(productTitle : string) {
    return this.http.get(this.baseUrl+"/products?title"+productTitle)
    .pipe(catchError(this.handleError));
  }
}
