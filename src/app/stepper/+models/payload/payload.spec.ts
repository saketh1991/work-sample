/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Payload } from './payload';

describe('Payload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Payload]
    });
  });

  it('should ...', inject([Payload], (model: Payload) => {
    expect(model).toBeTruthy();
  }));


  it('should create a valid payload', inject([Payload], (model: Payload) => {
    model.availability_zone = "us-west-2a";
    model.plan_id = "plan_FA8FBD1D";
    model.region = "us-west-2";
    model.system_time_zone = "us-pacific";
    model.vpc_id = "vpc-a6c5f7c3";
    model.environment_name = "sample environment";
    model.environment_description = "this is a sample environment";
    model.credentials = "mykeyname";
    model.addTddbs({
                "db_kanji_support": "yes",
                "db_nickname": "dbssys",
                "db_system_name": "tddbs",
                "dbc_password": "dbc"
            });
    model.addViewpoint();
    model.addServiceManagement({
                "sm_site_id": "",
                "sm_rest_password": "myrestpassword",
                "sm_password": "myadminpassword"
            });
    model.addRest();
    model.addDsc();
    model.addEcosystemManager();
    model.addDataMover({
                "dm_datamover_password": "mydmpassword",
                "dm_dbc_password": "mydbcpassword"
            });
  model.addPublicKey('my_ssh_key_name');
            
    expect(model).toBeTruthy();
  }));

});
