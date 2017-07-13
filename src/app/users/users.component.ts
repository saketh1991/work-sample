import { Component,ViewContainerRef, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import {CovalentDataTableModule, TdMediaService} from '@covalent/core';
import { AccountsService } from '../../modules/nebula-api';
import 'rxjs/add/operator/switchMap';

import { MdSnackBar, MdSnackBarConfig, MdSnackBarRef, OverlayContainer } from '@angular/material';
import { TdDialogService} from '@covalent/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'nebula-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  users:Array<any> = [];
  allUsers:Array<any> = [];
  loading: boolean = true;

  constructor(
    private accountsService: AccountsService,
    private _snackBarService: MdSnackBar,
    private _dialogService: TdDialogService,
    private _iconRegistry: MdIconRegistry,
    private _domSanitizer: DomSanitizer,
    public  mediaService: TdMediaService,
    private route:ActivatedRoute) {
  }

  ngOnInit() {
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/teradata.svg'));

      this.route.params
      .subscribe((params: Params) => {
        let role = params ? params['role'] : null;
        this.loadUsers(role);
      });

  }

  ngAfterViewInit(): void {
    this.mediaService.broadcast();
  }

  loadUsers(role:string) {
    this.loading = true;
    this.accountsService.getUsers().subscribe((response) => {
      this.loading = false;
      this.users = response.users;
      if(role) {
        if(role === 'new') {
          // put the most recent user on the top
          let newUser = this.users.pop();
          this.users.unshift(newUser);
          this.showSnackBar(newUser.username + ' was successfully created');
        } else {
          // filter the users by role
          this.users = this.users.filter((current) => {
            return current.roles.indexOf(role) !== -1;
          });
        }
      }
      this.loading = false;
    });
  }

  deleteUser(user): void {

    this._dialogService.openConfirm({
      message: 'Are you sure you want to permanently delete ' + user.username + ' account?',
      title: 'Please Confirm!',
      cancelButton: 'Cancel',
      acceptButton: 'Confirm',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {

        this.users = this.users.filter((current) => {
          return current.username !== user.username;
        });

        this.accountsService.deleteUser(user.username);

        // show the snackbar
        this.showSnackBar(user.username + ' was successfully deleted');

      }
    });
  }

  resetPassword(user) : void{
    this._dialogService.openAlert({
      message: 'Password reset method not implemented'
    });
  }

  isLoading(): boolean {
    return this.loading === true;
  }


  showSnackBar(message:string) {
    let snackBarRef: MdSnackBarRef<any> = this._snackBarService.open(message, 'Dismiss');
    setTimeout(() => {
      snackBarRef.dismiss();
    }, 5000);
  }
}
