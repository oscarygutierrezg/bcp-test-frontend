
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Change, PageChange } from '../model/change';
import { environment } from 'src/environments/environment';
import { JWT } from '../model/jwt';
import { User } from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

@Injectable({ providedIn: 'root' })
export class UserService {
  private changeUrl = '/v1/security';
  tokenChangeObs = new Subject<JWT>();
  jwt: JWT | undefined;


  constructor(
    private http: HttpClient
  ) { }

  authenticate(change: User): Observable<JWT> {
    return this.http.post<JWT>(environment.api + this.changeUrl+'/authenticate', change, httpOptions).pipe(
      tap((c: JWT) => {
        this.jwt = c
        this.tokenChangeObs.next(c);
      } ),
      catchError(this.handleError<JWT>('authenticate'))
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
