
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Currency } from '../model/currency';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private CurrencyUrl = '/v1/currency';
  currenciesChangeObs = new Subject<Currency[]>();


  constructor(
    private http: HttpClient
  ) { }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${environment.api}${this.CurrencyUrl}`)
      .pipe(
        tap(_ => {
          this.currenciesChangeObs.next(_);
          this.log('fetched Currencies');
        }),
        catchError(this.handleError<Currency[]>('getCurrencies', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     this.log(`${operation} failed: ${error.message}`);
     return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
