
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Change, PageChange } from '../model/change';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class ChangeService {
  private changeUrl = '/v1/change';
  changeChangeObs = new Subject<Change>();
  changesChangeObs = new Subject<PageChange>();
  change : Change | undefined;


  constructor(
    private http: HttpClient
  ) { }



  createChange(change: Change): Observable<any> {
    return this.http.post<any>(environment.api + this.changeUrl, change).pipe(
      tap((c: any) => {
        this.log(`created Change w/ id=${c.href}`)
        this.change = change
        this.changeChangeObs.next(this.change);
      } ),
      catchError(this.handleError<Change>('createChange'))
    );
  }

  createHttpOptions  () {
    return {  headers: new HttpHeaders({ 'Content-Type': 'application/json',  
    'Authorization':'Bearer ' +
    localStorage.getItem('token')
  
  })
  }
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' +
    localStorage.getItem('token')); 
    headers.append('Content-Type', 'application/json'); 
  }


  updateChange(change: Change): Observable<any> {
    return this.http.put(environment.api + this.changeUrl+ '/' + change.id , change ).pipe(
      tap(_ => this.log(`updated Change id=${JSON.stringify(Change)}`)),
      catchError(this.handleError<any>('updateChange'))
    );
  }

  getChanges(page: number =0, size: number = 20): Observable<PageChange> {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get<PageChange>(`${environment.api}${this.changeUrl}?&page=${page}&size=${size}`,this.createHttpOptions())
      .pipe(
        tap(_ => {
          this.changesChangeObs.next(_);
          console.log(JSON.stringify(_ ));
          this.log('fetched Changes');
        }),
        catchError(this.handleError<PageChange>('getChanges'))
      );
  }

  getChange(id: string): Observable<Change> {
    return this.http.get<Change>(environment.api + this.changeUrl + '/' + id ).pipe(
      tap(_ => {
        this.log(`get Change ${JSON.stringify(_)}`);
        this.change = _;
        this.changeChangeObs.next(this.change);
      }),
      catchError(this.handleError<any>('getChange'))
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
