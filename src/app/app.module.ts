import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule, MatInputModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatOptionModule, MatSelectModule, MatTableModule, MatMenuModule, MatProgressBarModule } from '@angular/material';

import 'hammerjs'

import { AppComponent } from './app.component';
import { LoginPageComponent } from './log-in/log-in.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordMatchValidator } from './directives/password-match.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AsyncEmailValidatorDirective } from './directives/async-email-validator.directive';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { TokenInterceptor } from './services/token-interceptor.service';
import { AccountInfoComponent } from './account-info/account-info.component';
import { EditAccountDetailsComponent } from './edit-account-details/edit-account-details.component';
import { SecurePipe } from './pipes/secure.pipe';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TidbitDialogComponent } from './modals/tidbit-dialog/tidbit-dialog.component';
import { SafeHtmlPipe } from './directives/safe-html.pipe';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AsyncEmailValidatorDirective,
    PasswordResetComponent,
    AccountInfoComponent,
    EditAccountDetailsComponent,
    SecurePipe,
    TidbitDialogComponent,
    SafeHtmlPipe,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MatNativeDateModule,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  entryComponents: [
    TidbitDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
