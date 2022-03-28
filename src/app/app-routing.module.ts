import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeFormComponent } from './components/change-form/change-form.component';
import { ChangeListComponent } from './components/change-list/change-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {  path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/changes', pathMatch: 'full' },
  {  path: 'changes', component: ChangeListComponent , canActivate: [AuthGuard] },
  {  path: 'new', component: ChangeFormComponent, canActivate: [AuthGuard]},
  {  path: 'edit/:id', component: ChangeFormComponent  , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
