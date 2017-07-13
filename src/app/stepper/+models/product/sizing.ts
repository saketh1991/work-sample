import { Instance } from './instance';

export class Sizing {
  id: string;
  type: string;
  instances: Instance[];

  constructor(id: string, type: string, instancesJSON: any) {
    this.id = id;
    this.type = type;
    this.instances = Instance.fromJSON(instancesJSON);
  }

  static fromJSON(sizingJSON: any[]): Sizing[] {
    const types: string[] = Object.keys(sizingJSON).filter((key: any) => key !== 'timestamp');
    return types.map((t: string) => new Sizing(sizingJSON[t]._id, t, sizingJSON[t]));
  }

  loadInstanceDetails(details: any[]): void {
    this.instances.forEach((i: Instance) => i.loadDetails(details));

    // sort instances by memory
    this.instances = this.instances.sort((a: Instance, b: Instance) => {
      if (a.memory > b.memory) {
        return 1;
      } else if (b.memory > a.memory) {
        return -1;
      }
      return 0;
    });
  }

  toJSON(): any {
    return {
      id: this.id,
      type: this.type,
      instances: this.instances.map((i: Instance) => i.toJSON()),
    };
  }
}
