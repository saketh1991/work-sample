export class Instance {
  id: number;
  type: string;
  launchConfig: string;
  volumeCount: number;
  volumeSize: number[];
  details: any;

  constructor(json: any) {
    this.id = json._id;
    this.type = json.InstanceType;
    this.launchConfig = json.LaunchConfig;
    this.volumeCount = json.VolumeCount;
    this.volumeSize = json.VolumeSize;
  }

  static fromJSON(instancesJSON: any): Instance[] {
    const types: string[] = Object.keys(instancesJSON);
    return types
      .filter((t: string) => t !== '_id')
      .map((t: string) => new Instance(instancesJSON[t]));
  }

  toJSON(): any {
    return {
      id: this.id,
      type: this.type,
      launchConfig: this.launchConfig,
      volumeCount: this.volumeCount,
      details: this.details,
    };
  }

  loadDetails(details: any[]): void {
    this.details = details.find((d: any) => d.instance_type === this.type);
  }

  get totalDevicesSize(): number {
    if (!this.details || !this.details.storage || !this.details.storage.devices || !this.details.storage.size) {
      return 0;
    }
    return this.details.storage.devices * this.details.storage.size;
  }

  get memory(): number {
    if (!this.details) {
      return 0;
    }
    return this.details.memory;
  }

  get vCPU(): number {
    if (!this.details) {
      return 0;
    }
    return this.details.vCPU;
  }

  get networkPerfomance(): string {
    if (!this.details) {
      return undefined;
    }

    return this.details.network_performance.replace('Gigabit', 'Gbit');
  }

  get storageThroughput(): number {
    if (!this.details || this.details.ebs_iops === 0) {
      return undefined;
    }

    return this.details.ebs_iops / 1000;
  }

  get ebsMaxBandwidth(): number {
    if (!this.details) {
      return 0;
    }
    return this.details.ebs_max_bandwidth;
  }
}
