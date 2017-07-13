import { IPayload } from './interfaces/payload';
import { ICommonSubnet } from './interfaces/common-subnet';
import { ICommonSubnetExisting } from './interfaces/common-subnet-existing';
import { ITddbsBundle } from './interfaces/tddbs-bundle';
import { IServerManagementBundle} from './interfaces/server-management-bundle';
import { IDataMoverBundle } from './interfaces/data-mover-bundle';
import { Injectable } from '@angular/core';

@Injectable()
export class Payload {
  private _payload: any = {};

  constructor() {
    this._payload.deployment_bundle = [];
    this._payload.public_keys = [];
   }

  /**
   * fetch the current payload object
   */
  get payload(): IPayload {
    return this._payload;
  }

  /**
   * fetch the current payload as a json string
   */
  get json(): string{
    return JSON.stringify(this._payload);
  }

  set plan_id(value: string) {
    this._payload.plan_id = value;
  }

  set system_time_zone(value: string) {
    this._payload.system_time_zone = value;
  }

  set vpc_id(value: string) {
    this._payload.vpc_id = value;
  }

  set environment_name(value: string) {
    this._payload.environment_name = value;
  }

  set environment_description(value: string) {
    this._payload.environment_description = value;
  }

  set credentials(value: string) {
    this._payload.credentials = value;
  }

  set availability_zone(value: string) {
    this._payload.availability_zone = value;
  }

  set common_subnet_existing(configuration: ICommonSubnetExisting) {
    this._payload.common_subnet_existing = configuration;
  }

  set common_subnet(configuration: ICommonSubnet) {
    this._payload.common_subnet = configuration;
  }

  set region(value: string) {
    this._payload.region = value;
  }

  addPublicKey(key: string): void {
    this._payload.public_keys.push({key_name: key});
  }

  addTddbs(config: ITddbsBundle): void {
    this._payload.deployment_bundle.push({
      configuration: config,
      properties: { system_type: 'tddbs'},
    });
  }

  addViewpoint(): void {
    this._payload.deployment_bundle.push({
      properties: { system_type: 'viewpoint'},
    });
  }

  addServiceManagement(config: IServerManagementBundle): void {
    this._payload.deployment_bundle.push({
      configuration: config,
      properties: { system_type: 'servermanagement'},
    });
  }

  addRest(): void {
    this._payload.deployment_bundle.push({
      properties: { system_type: 'rest'},
    });
  }

  addDsc(): void {
    this._payload.deployment_bundle.push({
      properties: { system_type: 'dsc'},
    });
  }

  addEcosystemManager(): void {
    this._payload.deployment_bundle.push({
      properties: { system_type: 'ecosystemmanager'},
    });
  }

  addDataMover(config: IDataMoverBundle): void {
    this._payload.deployment_bundle.push({
      configuration: config,
      properties: { system_type: 'datamover'},
    });
  }

}
