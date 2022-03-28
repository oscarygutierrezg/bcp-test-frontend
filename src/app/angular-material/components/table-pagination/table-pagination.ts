
import {Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChangeService } from 'src/app/services/change.service';
import { Change, PageChange } from 'src/app/model/change';

@Component({
  selector: 'app-table-pagination',
  styleUrls: ['table-pagination.css'],
  templateUrl: 'table-pagination.html',
})

export class TablePaginationComponent implements OnInit, OnDestroy  {

  displayedColumns: string[] = ['exchangeRate', 'currencyFrom', 'currencyTo', 'amount','rate','acciones'];

  dataSource: any;
  private _changes: PageChange = new PageChange;
  public get changes(): PageChange {
    return this._changes;
  }
  public set changes(value: PageChange) {
    this._changes = value;
  }

  @ViewChild(MatPaginator, {static: false})
  paginator: MatPaginator | undefined;
  private changesChangeObs: Subscription | undefined;
  change: Change | undefined;
  newChange: Change | undefined;

  constructor(
    private router: Router,
    private changeService: ChangeService,
    private cd: ChangeDetectorRef
    ) {
    }
  
  ngOnInit() {

    this.changesChangeObs = this.changeService.changesChangeObs.subscribe( (products: PageChange) => {
      this.changes = products;
      this.dataSource = new MatTableDataSource<Change>(this.changes.content);
      this.dataSource.paginator = this.paginator;
  });
  }


  ngOnDestroy() {
    if(this.changesChangeObs){
      this.changesChangeObs.unsubscribe();
    }
  }

  getChanges(page: number, size: number): void {
    this.changeService.getChanges(page, size)
    .subscribe(products => {
      console.log(JSON.stringify(products ));
      this.changes = products;
      this.dataSource = new MatTableDataSource<Change>(this.changes.content);
      this.dataSource.paginator = this.paginator;
    });
  }
  

  edit(id: string) {
    this.router.navigateByUrl(`/edit/${id}`);
  }
  

  public next(){
      this.getChanges(this.changes.number+1,  this.changes.size);
  } 

  public prev(){
    this.getChanges(this.changes.number-1,  this.changes.size);

} 

 
}


