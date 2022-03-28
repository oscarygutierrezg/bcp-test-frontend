import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablePaginationComponent } from './angular-material/components/table-pagination/table-pagination';
import { ConfirmDialogComponent } from './angular-material/components/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './angular-material/angular-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { InfoDialogComponent } from './angular-material/components/info-dialog/info-dialog.component';
import { AuthGuard } from './guard/auth.guard';
import { MatIconModule } from '@angular/material/icon';
import { ChangeListComponent } from './components/change-list/change-list.component';
import { ChangeFormComponent } from './components/change-form/change-form.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './auth/token.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    TablePaginationComponent,
    ChangeListComponent,
    ChangeFormComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    NumberOnlyDirective,
    LoginComponent
  ],
  imports: [
    MatIconModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    InfoDialogComponent
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'PEN'},
    AuthGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

