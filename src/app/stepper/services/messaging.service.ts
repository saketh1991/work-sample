import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';

@Injectable()
export class MessagingService {
  constructor(private _snackBarService: MdSnackBar) { }

  showMessage(message: string, action: string = 'Dismiss', hideAfter: number = 2000): void {
    const ref: MdSnackBarRef<any> = this._snackBarService.open(message, action);
    setTimeout(() => ref.dismiss(), hideAfter);
  }
}
