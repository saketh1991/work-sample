/**
 * Created by fl255007 on 5/9/17.
 */
import {BuildPlan} from './build-plan';
import {Bundle} from './bundle';
import {Sizing} from './product/sizing';
import {STORAGE_TYPES} from "./storage-type/index";
import {Instance} from "./product/instance";
import {Specifics} from "./product/specifics";

describe('BuildPlan', () => {
  let buildPlan:BuildPlan;

  beforeEach(() => {
    let bundle = new Bundle({
      id: 1,
      code: "test-code",
      name: "test-bundle",
      color: "test-color",
      description: "test-description",
      products: ["test-product"],
      specifics: "test-specific",
      storages: {local: ['local-storage'], network: ['network-storage']}
    });
    bundle.save();

    buildPlan = new BuildPlan();

    let instance = new Instance({
        _id: 'test-instance',
        InstanceType: 'test-type',
        launchConfig: 'test-config',
        volumeCount: 1,
        volumeSize: 1
      });

    let sizing = new Sizing('id', 'test-sizing', {
      _id: 'test-instance',
      type: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });

    buildPlan._storageMedia = sizing;
    buildPlan._storageType = STORAGE_TYPES[0];
    buildPlan.storageSize = '1000';
    buildPlan.instanceType = instance;
    buildPlan._specifics = new Specifics({
      concurrency: "test-concurrency",
      nodelimit: {
        maximum: '10',
        minimum:'1'
      },
      support: "test-support"
    });
  });

  it('Should construct', () => {
    expect(buildPlan).toBeTruthy();
  });

  it('Should load the saved bundle when it constructs', () => {
    expect(buildPlan.bundle.name).toEqual('test-bundle');
  });

  it('Should do nothing when you reset (i dont really get this one)', () => {
    sessionStorage.setItem('bundle', 'bundle');
    BuildPlan.reset();
    expect(sessionStorage.getItem('bundle')).toEqual('bundle');
  });
  it('Should do nothing when you reset an instance (i dont really get this one, or why there is this duplicate function)', () => {
    sessionStorage.setItem('bundle', 'bundle');
    buildPlan.reset();
    expect(sessionStorage.getItem('bundle')).toEqual('bundle');
  });

  it('Should validate the plan name', () => {
    buildPlan.name = null;
    expect(buildPlan.isPlanNameValid()).toBeFalsy();
    buildPlan.name= 'test-plan';
    expect(buildPlan.isPlanNameValid()).toBeTruthy();
  });

  it('Has data mover should return true if the data mover is included', () => {
    sessionStorage.setItem('nebulaBuildPlan', '{"selectedExtraApplications": [{"type": "datamover"}]}');
    expect(buildPlan.hasDataMover()).toBeTruthy();
  });

  it('Has data mover should return false if the data mover is not included', () => {
    sessionStorage.setItem('nebulaBuildPlan', '{"selectedExtraApplications": []}');
    expect(buildPlan.hasDataMover()).toBeFalsy();
  });

  it('Should let you know if an included app is included', () => {
    sessionStorage.setItem('nebulaBuildPlan', '{"selectedIncludedApplications": [{"type": "tester"}]}');
    expect(buildPlan.hasIncludedApp('tester')).toBeTruthy();
  });
  it('Should let you know if an included app is not included', () => {
    sessionStorage.setItem('nebulaBuildPlan', '{"selectedIncludedApplications": []}');
    expect(buildPlan.hasIncludedApp('tester')).toBeFalsy();
  });

  it('Should get the bundle name', () => {
    expect(buildPlan.bundleName).toEqual('test-bundle')
  });

  it('Should get the instance type name', () => {
    expect(buildPlan.instanceTypeName).toEqual('test-type')
  });

  it('Should return undefined instead of the instance type name if there is no instance', () => {
    buildPlan.instanceType = null;
    expect(buildPlan.instanceTypeName).toBeUndefined();
  });

  it('Should get the storage type name', () => {
    expect(buildPlan.storageTypeName).toEqual('Network')
  });

  it('Should return undefined instead of the storage type name if there is no storage', () => {
    buildPlan._storageType = null;
    expect(buildPlan.storageTypeName).toBeUndefined();
  });

  it('Should get the storage media name', () => {
    expect(buildPlan.storageMediaName).toEqual('test-sizing')
  });

  it('Should return undefined instead of the storage media name if there is no storage media', () => {
    buildPlan._storageMedia = null;
    expect(buildPlan.storageMediaName).toBeUndefined();
  });

  it('Get product id should return the bundle code', () => {
    expect(buildPlan.productId).toEqual('test-code');
  });

  it('Get product id should return null if there is no bundle', () => {
    buildPlan.bundle = null;
    expect(buildPlan.productId).toBeUndefined();
  });

  it('Get included applications should return the bundles included apps', () => {
    expect(buildPlan.includedApplications).toEqual(["test-product"]);
  });

  it('Get included applications should return null if there is no bundle', () => {
    buildPlan.bundle = null;
    expect(buildPlan.includedApplications).toBeUndefined();
  });

  it('Get the storage type', () => {
    expect(buildPlan.storageType.type).toEqual('Network');
  });

  it('Should set the storage type', () => {
    let type = STORAGE_TYPES[1];
    type.sizings = [];
    buildPlan.storageType = type;
    expect(buildPlan.storageType.type).toEqual('Local');
  });

  it('Should get the storage media', () => {
    expect(buildPlan.storageMedia.type).toEqual('test-sizing');
  });

  it('Should set the storage media', () => {
    let sizing = new Sizing('id', 'new-sizing', {
      _id: 'test-instance',
      type: 'new-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    buildPlan.storageMedia = sizing;
    expect(buildPlan.storageMedia.type).toEqual('new-sizing');
  });

  it('Should get product specifics', () => {
    expect(buildPlan.productSpecifics.concurrency).toEqual('Test-concurrency');
  });

  it('Should set product specifics', () => {
      let specifics = new Specifics({
        concurrency: "new-concurrency",
        nodeLimit: 1,
        support: "test-support"
      });
      buildPlan.productSpecifics = specifics;
      expect(buildPlan.productSpecifics.concurrency).toEqual('New-concurrency');
  });

  it('Should get the node limit', () => {
    expect(buildPlan.nodeLimit).toEqual({ maximum: '10', minimum: '1' });
  });

  it('Should return undefined instead of the node limit if the specifics are not set', () => {
    buildPlan._specifics = null;
    expect(buildPlan.nodeLimit).toBeUndefined();
  });

  it('Should get the max nodes', () => {
    expect(buildPlan.maxNodes).toEqual(10);
  });

  it('Should return undefined instead of max nodes if the specifics are not set', () => {
    buildPlan._specifics = null;
    expect(buildPlan.maxNodes).toBeUndefined();
  });

  it('Should get the min nodes', () => {
    expect(buildPlan.minNodes).toEqual(1);
  });

  it('Should return undefined instead of min nodes if the specifics are not set', () => {
    buildPlan._specifics = null;
    expect(buildPlan.minNodes).toBeUndefined();
  });

  it('Should get included applications', () => {
    buildPlan.bundle.products = [
      {name: 'show-me', selected: true},
      {name: 'dont-show', selected: false},
    ];
    let selected = buildPlan.selectedIncludedApplications;
    expect(selected.length).toEqual(1);
    expect(selected[0].name).toEqual('show-me');
  });

  it('Should get extra applications', () => {
    let selected = buildPlan.selectedExtraApplications;
    expect(selected.length).toEqual(0);

    buildPlan.extraApplications[0].selected = true;
    selected = buildPlan.selectedExtraApplications;
    expect(selected.length).toEqual(1);
  });

  it('should determine if an instance is selected', () => {
    buildPlan.instanceType.details = 'test-details';
    expect(buildPlan.isInstanceSelected).toBeTruthy();
  });

  it('should determine if a build plan can be calculated', () => {
    buildPlan.instanceType.details = 'test-details';
    expect(buildPlan.canCalculate).toBeTruthy();
  });

  it('Should calculate the total memory', () => {
    expect(buildPlan.totalMemory).toBeUndefined();
    buildPlan.instanceType.details = {memory: 1024}
    expect(buildPlan.totalMemory).toEqual(1024);
  });

  it('Should calculate the total vcpus', () => {
    expect(buildPlan.totalVCore).toBeUndefined();
    buildPlan.instanceType.details = {vCPU: 1}
    expect(buildPlan.totalVCore).toEqual(1);
  });

  it('Should calculate the total storage', () => {
    expect(buildPlan.totalStorage).toEqual(1000);
    buildPlan._storageType = null;
    expect(buildPlan.totalStorage).toBeUndefined();
  });

  it('Should not attempt to calculate storage throughput if there is no instance selected', () => {
    buildPlan.instanceType = null;
    expect(buildPlan.storageThroughput).toBeUndefined();
  });
});
