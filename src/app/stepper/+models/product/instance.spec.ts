import {Instance} from "./instance";
import {INSTANCES} from "../../../../../testing/nebula-api/providers/aws/instances";

describe('Instance', () => {
  it('Should construct', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    expect(instance).toBeTruthy();
  });

  it('Should load from json', () => {
    let instances = Instance.fromJSON(INSTANCES);
    expect(instances).toBeTruthy();
  });

  it('Should export a json object', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    expect(instance.toJSON()).toBeTruthy();
  });

  it('Should return 0 for total device size if details are not set', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    expect(instance.totalDevicesSize).toEqual(0);
  });

  it('Should return the total device size', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    instance.details = {
      "storage": {
        "ssd": false,
          "devices": 4,
          "size": 420.0
      }
    }
    expect(instance.totalDevicesSize).toEqual(1680);
  });

  it('Should return 0 for the memory if details are not set', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    expect(instance.memory).toEqual(0);
  });

  it('Should return the memory', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    instance.details = {
      memory: 1024
    }
    expect(instance.memory).toEqual(1024);
  });

  it('Should return the vcpus', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    instance.details = {
      vCPU: 1
    }
    expect(instance.vCPU).toEqual(1);
  });

  it('Should return 0 for the vcpus if details are not set', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    expect(instance.vCPU).toEqual(0);
  });

  it('Should return undefined for the network performance if details are not set', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    expect(instance.networkPerfomance).toBeUndefined();
  });


  it('Should return the network performance', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    instance.details = {
      network_performance: 'high'
    }
    expect(instance.networkPerfomance).toEqual('high');
  });

  it('Should return undefined for the storage throughput if details are not set', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    expect(instance.storageThroughput).toBeUndefined();
  });

  it('Should return the storage throughput', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    instance.details = {
      ebs_iops: '8000'
    }
    expect(instance.storageThroughput).toEqual(8);
  });
  it('Should return 0 for the ebs max bandwidth if details are not set', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    expect(instance.ebsMaxBandwidth).toEqual(0);
  });
  it('Should return the ebs max bandwidth', () => {
    let instance = new Instance({
      _id: 'test-instance',
      InstanceType: 'test-type',
      launchConfig: 'test-config',
      volumeCount: 1,
      volumeSize: 1
    });
    instance.details = {
      ebs_max_bandwidth: 1000
    }
    expect(instance.ebsMaxBandwidth).toEqual(1000);
  });
});
