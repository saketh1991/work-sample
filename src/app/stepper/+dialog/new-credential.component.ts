import { Component, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar, MdSnackBarRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { CloudCredentialService, LoaderService, MessagingService } from '../services';
import { CloudCredential, CLOUD_CREDENTIAL_KEY_TYPE, CLOUD_CREDENTIAL_ROLE_TYPE } from '../+models';

enum CredentialType {
  Role = 1,
  Key  = 2,
}

@Component({
  selector: 'app-new-credential',
  templateUrl: './new-credential.component.html',
  styleUrls: ['./new-credential.component.scss'],
  viewProviders: [ CloudCredentialService ],
})
export class NewCredentialDialogComponent {
  name: string;
  credentialType: CredentialType = CredentialType.Role;
  type: string = CLOUD_CREDENTIAL_ROLE_TYPE;
  accessKey: string;
  secretKey: string;
  role: string;
  helpExpanded: boolean = false;
  principalArn: string;
  policyDocument: string;

  constructor(private _helpDialog: MdDialog,
              private _dialogRef: MdDialogRef<any>,
              private _loaderService: LoaderService,
              private _messagingService: MessagingService,
              private _viewContainerRef: ViewContainerRef,
              private _snackBarService: MdSnackBar,
              private _cloudCredentialService: CloudCredentialService) { }

  onCredentialTypeChange($event: any): void {
    const type: number = parseInt(this.credentialType.toString(), 10);

    if (type === CredentialType.Key) {
      this.type = CLOUD_CREDENTIAL_KEY_TYPE;
      this.role = undefined;
    }

    if (type === CredentialType.Role) {
      this.type = CLOUD_CREDENTIAL_ROLE_TYPE;
      this.accessKey = undefined;
      this.secretKey = undefined;
    }
  }

  close(): void {
    this._dialogRef.close();
  }

  save(): void {
    const credential: CloudCredential = new CloudCredential(
      this.name,
      this.type,
      this.accessKey,
      this.secretKey,
      this.role
    );

    const create$: Observable<any> = this._cloudCredentialService.create(credential);

    this._loaderService.load('credential.save', create$).subscribe((res: any) => {
      this._messagingService.showMessage(`New credential ${credential.name} created`);
      this._dialogRef.close({ success: true, credential: res });
    }, (error: any) => this._dialogRef.close({ success: false, error }));
  }

  isSaving(): boolean {
    return this._loaderService.isLoading('credential.save');
  }

  get key(): boolean {
    return this.type === CLOUD_CREDENTIAL_KEY_TYPE;
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
