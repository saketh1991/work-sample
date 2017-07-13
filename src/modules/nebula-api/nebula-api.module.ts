import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NebulaService } from './src/services';
import { AccountsService } from './src/services';
import { SecurityKeyService } from './src/services';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  declarations: [],
  exports: [],
  providers: [
    NebulaService,
    AccountsService,
    SecurityKeyService
  ],
})

export class NebulaApiModule { }
