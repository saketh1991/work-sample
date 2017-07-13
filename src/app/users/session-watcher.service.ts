import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';

import { TokenService } from '../../modules/nebula-api';

@Injectable()
export class SessionWatcherService {
  public snackbar: MdSnackBarRef<any>;

  loginPage: string = '/login';
  timeoutMessage: string = 'Session timed out. Please log in again.';

  constructor(private _router: Router,
              private _snackBarService: MdSnackBar,
              private _tokenService: TokenService) {}

  /**
   * Register the listener to the token state event
   */
  watchToken(): void {
    this._tokenService.tokenState$.subscribe((state: any) => {
      if (!state) {
        this.redirectToLogin();
      }
    });
  }

  /**
   * Redirects the user to log back in when their session expires
   */
  redirectToLogin(): void {
    this.snackbar = this._snackBarService.open(this.timeoutMessage, 'DISMISS');
    this._router.navigate([this.loginPage]);
  }

  /**
   * Dismisses the snackbar
   */
  hideNotification(): void {
    if (this.snackbar) {
      this.snackbar.dismiss();
    }
  }
}
