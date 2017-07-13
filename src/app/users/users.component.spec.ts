/* tslint:disable:no-unused-variable */
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Router} from '@angular/router';

import { UsersComponent } from './users.component';
import { TestingModule} from "../../../testing/testing.module";
import { MdSnackBarConfig, MdSnackBarRef, OverlayContainer } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { AccountsService } from '../../modules/nebula-api';
import  {MdSnackBar} from "@angular/material";
import { DialogServiceStub } from '../../../testing/stubs/dialog-stubs';

describe('Component: Users', () => {

  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let overlayContainerElement: HTMLElement;
  let user =  {username: 'admin'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ],
      declarations: [ UsersComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.changeDetectorRef.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('reset password should prompt user to ask their admin to update it for them', () => {
    component.resetPassword(user);
    let dialog = TestBed.get(TdDialogService);
    expect(dialog.message).toEqual('Password reset method not implemented');
  });

  it('should show the snack bar when loading users.', () => {

     component.loadUsers('new');
     let snackBar = TestBed.get(MdSnackBar);
     expect(snackBar.ref.visible).toBeTruthy();
  });

  it('should get the admin role index', () => {
     component.loadUsers('admin');
     expect(component.users[0].roles.indexOf('admin')).toEqual(0);
  });

  it('should delete the user if you confirm', () => {
    const confirmDialog = TestBed.get(TdDialogService);
    component.deleteUser(user);

  });

  it('should prompt you to confirm when you delete a user', () => {
    const confirmDialog = TestBed.get(TdDialogService);
    component.deleteUser(user);
    expect(confirmDialog.confirmOpen).toBeTruthy();
  });

  it('should delete the user if you accept the confirm dialog', () => {
    const confirmDialog = TestBed.get(TdDialogService);
    component.deleteUser(user);
    confirmDialog.confirm();
     let snackBar = TestBed.get(MdSnackBar);
     expect(snackBar.ref.visible).toBeTruthy();
  });

  it('The snackbar should dismiss after 5 seconds on error', () => {
    const confirmDialog = TestBed.get(TdDialogService);
    component.deleteUser(user);
    confirmDialog.confirm();
    let snackBar = TestBed.get(MdSnackBar);
    let ref = snackBar.ref
    setTimeout(() => {
      expect(ref.visible).toBeFalsy();
    }, 10500);

  });

  it('should...', () => {
     component.isLoading();
     expect(component.loading).toBeFalsy();
  }); 

});

