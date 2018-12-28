import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { EditAccountDetailsComponent } from './edit-account-details/edit-account-details.component';
import { AuthGuard } from './services/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: PasswordResetComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'account-info', component: AccountInfoComponent, canActivate: [AuthGuard]},
  { path: 'edit-account-info/:id', component: EditAccountDetailsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'edit-account-info', component: EditAccountDetailsComponent, canActivate: [AuthGuard] },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: '', component: LoginPageComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}