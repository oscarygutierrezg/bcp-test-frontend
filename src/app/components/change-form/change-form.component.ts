import { Currency } from '../../model/currency';
import { Router, ActivatedRoute } from '@angular/router';

import { CurrencyService } from 'src/app/services/currency.service';
import { ConfirmDialogComponent } from 'src/app/angular-material/components/confirm-dialog/confirm-dialog.component';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InfoDialogComponent } from 'src/app/angular-material/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeService } from 'src/app/services/change.service';
import { Change } from 'src/app/model/change';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-form',
  templateUrl: './change-form.component.html',
  styleUrls: ['./change-form.component.css'],
})

export class ChangeFormComponent implements OnInit, OnDestroy {
  change: Change = new Change;
  currencies: Currency[] = [];
  private currenciesChangeObs: Subscription | undefined;
  changeForm: FormGroup = this.setFormControl();
  exchangeRateCtrl: FormControl = new FormControl;
  amountCtrl: FormControl = new FormControl;
  rateCtrl: FormControl = new FormControl;
  currencyToCtrl: FormControl = new FormControl;
  currencyFromCtrl: FormControl = new FormControl;
  idChange: string =  "";


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private changeService: ChangeService,
    private dialog: MatDialog) {
  }
  ngOnDestroy(): void {
   if(this.currenciesChangeObs){
     this.currenciesChangeObs.unsubscribe()
   }
  }

    
  getCurrencies(): void {
    this.currencyService.getCurrencies()
    .subscribe(products => {
      this.currencies = products;
    });
  }


  ngOnInit(): void {

    this.currenciesChangeObs = this.currencyService.currenciesChangeObs.subscribe( (c: Currency[]) => {
      this.currencies = c;
  });
  this.getCurrencies();

    this.idChange = this.route.snapshot.params['id'];
    if (this.idChange) {
      this.changeService.getChange(this.idChange).subscribe(c => {
        this.change = c;
        this.changeForm = this.setFormControl();
      });
    } else {
      this.change = new Change();
      this.changeForm = this.setFormControl();
    }
  }


  setFormControl() {
    this.exchangeRateCtrl = new FormControl(this.change?.exchangeRate, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]);
      this.currencyFromCtrl = new FormControl(this.change?.currencyFrom, [
        Validators.required
      ]);
      this.currencyToCtrl = new FormControl(this.change?.currencyTo, [
        Validators.required
      ]);
      this.rateCtrl = new FormControl(this.change?.rate, [Validators.required, Validators.min(1), Validators.max(9999999)]);
      this.amountCtrl = new FormControl(this.change?.rate, [Validators.required, Validators.min(1), Validators.max(9999999)]);
    
    return new  FormGroup({
      exchangeRate: this.exchangeRateCtrl,
      currencyFrom: this.currencyFromCtrl,
      currencyTo: this.currencyToCtrl,
      amount: this.amountCtrl,
      rate: this.rateCtrl,
    }, );
  }

  get currencyTo() {
    return this.changeForm.get('currencyTo');
  }

  get currencyFrom() {
    return this.changeForm.get('currencyFrom');
  }

  get exchangeRate() {
    return this.changeForm.get('exchangeRate');
  }

  get amount() {
    return this.changeForm.get('amount');
  }
  get rate() {
    return this.changeForm.get('rate');
  }


  guardar() {
    console.log('Change',JSON.stringify(this.change));
    if (this.idChange) {
      this.onConfirmUpdate();
    } else {
      this.change.id = '';
      this.changeService.createChange(this.change)
        .subscribe(c => {
          console.log(JSON.stringify(c));
          this.changeService.getChanges();
          this.router.navigateByUrl('/');
        });
    }
  }

  onConfirmUpdate() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atención',
        body: `¿Está seguro de actualizar el Tipo de Cambio  ${this.change.exchangeRate}?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changeService.updateChange(this.change)
          .subscribe(c => {
            console.log(JSON.stringify(c));
            this.changeService.getChanges();
            this.router.navigateByUrl('/');
          });
      }
    });
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  showModal(title: string, body: string) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title,
        body,
      }
    });
}

}
