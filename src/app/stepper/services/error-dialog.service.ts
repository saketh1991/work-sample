import { Injectable, ViewContainerRef } from '@angular/core';
import { Response,  ResponseOptions} from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorDialogService {
  constructor(private _snackBarService: MdSnackBar,
              private _dialogService: TdDialogService) { }

  displayError(viewContainerRef: ViewContainerRef, title: string, error: Response | any): Observable<any> {
    let errorMsg: string;
    
    if (error instanceof Response) {
      if (error.status === 0) {
        errorMsg = `Connection refused to ${error.url}`;
      } else {
        let err: string;

        try {
          const json: any = error.json();
          err = json.error || JSON.stringify(json);
        } catch (e) {
          err = `${error}`;
        }

        errorMsg = `${error.status} - ${error.statusText || ''} - ${err}`;
      }
    } else {
      errorMsg = error.message ? error.message : error.toString();
    }

    return this._dialogService.openConfirm({
      message: '' + errorMsg,
      viewContainerRef: viewContainerRef,
      title,
      cancelButton: 'Stop',
      acceptButton: 'Retry',
    }).afterClosed();
  }
}
