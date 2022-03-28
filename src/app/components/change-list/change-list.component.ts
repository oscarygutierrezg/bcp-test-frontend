import { Component, OnDestroy, OnInit } from '@angular/core';
import { Change, PageChange } from '../../model/change';
import { Router } from '@angular/router';
import { ChangeService } from 'src/app/services/change.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-list',
  templateUrl: './change-list.component.html',
  styleUrls: ['./change-list.component.css']
})
export class ChangeListComponent implements OnInit,  OnDestroy{
  private changes: PageChange = new PageChange;
  private changesChangeObs: Subscription | undefined;

  constructor(
    private router: Router,
      private changeService: ChangeService) {
    }
  ngOnDestroy(): void {
    if(this.changesChangeObs){
      this.changesChangeObs.unsubscribe();
    }

  }

  ngOnInit() {
    this.getChanges();
    this.changesChangeObs = this.changeService.changesChangeObs.subscribe( (c: PageChange) => {
     this.changes = c
    });
  }
  
  getChanges(): void {
    this.changeService.getChanges()
    .subscribe(products => {
      this.changes = products;
    });
  }
  
  goChange() {
    this.router.navigateByUrl('/change');
  }
  
  goNewChange() {
    this.router.navigateByUrl('/new');
  }
}

