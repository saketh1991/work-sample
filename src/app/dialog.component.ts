import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { securitykeyService } from '../services';
import { MdSnackBar, MdSnackBarConfig, MdSnackBarRef } from '@angular/material';
import { JWTDataService } from '../services/';
/* component for custom dialog*/
@Component({
  selector: 'your-dialog-selector',
  template: `
<div layout="column" flex>
     <div layout="row" layout-align="start center" class="pull-bottom-md" flex>
  <h2 class="md-title pull-top-xs pull-bottom-xs">Add SSH Key Pair</h2>
  <span flex></span>
  <a>
 <md-icon tooltip-position="before" md-tooltip="More Info and Support" class="pull-left-lg pull-right-lg tc-blue-grey-100">help_outline</md-icon></a>
    </div>
     <h3 class="md-body-1 tc-grey-700">This information is needed to deploy any configuration</h3>
  <form #loginForm="ngForm">
				  	<div layout="column">
                <md-input-container flex-gt-xs>
                  <input mdInput placeholder="Enter your keyname, e.g. My_keyname" type="text" name="keyname" [(ngModel)]="keyname" required />
                </md-input-container>
                <md-input-container flex-gt-xs>
                  <input mdInput placeholder="Copy Your SSH Key Pair Here" type="text" name="publickey" [(ngModel)]="publickey" required />
                </md-input-container>
              <span flex></span>
                </div>
						</form>
            <div layout="row" layout-align="end" class="pad-top-sm">
             <div class="push-right-sm">
<button md-raised-button (click)="dialogRef.close()">CANCEL</button>
</div>
  <button md-raised-button color="accent" (click)="details_key()" [disabled]="!loginForm.form.valid">ADD KEY</button>
  </div>
  </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent {
  security: any;
  keyname: any;
  publickey: any;
  res: any;

  private _snackBarConfig: MdSnackBarConfig;


  constructor(public dialogRef: MdDialogRef<any>, private security_service: securitykeyService, private _snackBarService: MdSnackBar, viewContainerRef: ViewContainerRef, private _jwtDataService: JWTDataService) {

    this.security = security_service;

  }

  showSnackBar(): void {
    let snackBarRef: MdSnackBarRef<any> = this._snackBarService.open(this.res, 'Dismiss');
    setTimeout(() => {
      snackBarRef.dismiss();
    }, 2000);
  }
/* function subscribing the post security key service*/
  details_key() {

    this.security.keyname = this.keyname;
    this.security.public = this.publickey;


    this.security.key().subscribe(data => {
    this.res = this.keyname+" key is created"; this.showSnackBar();
    setTimeout(() => {
      this.dialogRef.close();
      //this._jwtDataService.storeSecurity(this.keyname, this.publickey);
    }, 1000);
    }, error => {
      this.res = "Cloud Authentication failed";
      this.showSnackBar();
    });

  }

}
