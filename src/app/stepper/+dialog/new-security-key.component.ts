import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar, MdSnackBarRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { CloudCredentialService, LoaderService, MessagingService } from '../services';

@Component({
  selector: 'app-new-security-key',
  templateUrl: './new-security-key.component.html',
  styleUrls: ['./new-security-key.component.scss'],
  viewProviders: [ CloudCredentialService ],
})
export class NewSecurityKeyDialogComponent {
  name: string;
  contents: string;
  helpExpanded: boolean = false;
  sshCommand: string = 'ssh-keygen -y -f PRIVATE_KEY_FILE > PUB_KEY_OUTFILE';

  constructor(private _dialogRef: MdDialogRef<any>,
              private _loaderService: LoaderService,
              private _messagingService: MessagingService,
              private _dialogService: MdDialog,
              private _snackBarService: MdSnackBar,
              private _cloudCredentialService: CloudCredentialService) { }

  close(): void {
    this._dialogRef.close();
  }

  save(): void {
    const create$: Observable<any> = this._cloudCredentialService.createKey(this.name, this.contents);

    this._loaderService.load('key.save', create$).subscribe((res: any) => {
      this._messagingService.showMessage(`New security key ${this.name} created`);
      this._dialogRef.close({ success: true, key: res });
    }, (error: any) => this._dialogRef.close({ success: false, error }));
  }

  isSaving(): boolean {
    return this._loaderService.isLoading('key.save');
  }

  openHelp(): void {
    this.helpExpanded = true;
  }

  closeHelp(): void {
    this.helpExpanded = false;
  }

  showClipMessage(message: string): void {
    const snackBarRef: MdSnackBarRef<any> =
      this._snackBarService.open(`${message} was copied to the clipboard`, 'Dismiss');

    setTimeout(() => {
      snackBarRef.dismiss();
    }, 5000);
  }

}
