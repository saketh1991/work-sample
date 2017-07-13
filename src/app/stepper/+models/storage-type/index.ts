import { BuildPlan } from '../build-plan';
import { Sizing } from '../product/sizing';

class StorageType {
  type: string;
  options: string[];
  sizes: string[];
  sizings: Sizing[];

  toJSON(): any {
    return {
      type: this.type,
      options: this.options,
      sizes: this.sizes,
      sizings: this.sizings.map((s: Sizing) => s.toJSON()),
    };
  }

  loadSizings(sizings: Sizing[]): void {
    this.sizings = this.options
      .filter((opt: string) => sizings.find((s: Sizing) => s.type === opt))
      .map((opt: string) => sizings.find((s: Sizing) => s.type === opt));
  }

  loadInstanceDetails(details: any[]): void {
    this.sizings.forEach((s: Sizing) => s.loadInstanceDetails(details));
  }

  calculateStorage(plan: BuildPlan): number {
    throw new Error('called calculateStorage on base class');
  }
}

class LocalStorageType extends StorageType {
  constructor() {
    super();
    this.type = 'Local';
    this.options = ['SSD', 'HDD'];
    this.sizes = undefined;
  }

  calculateStorage(plan: BuildPlan): number {
    if (!plan.isInstanceSelected || !plan.nodeCount) {
      return 0;
    }
    return plan.instanceType.totalDevicesSize * plan.nodeCount / 1000;
  }
}

class NetworkStorageType extends StorageType {
  constructor() {
    super();
    this.type = 'Network';
    this.options = ['EBS_SSD'];
    this.sizes = ['5', '20'];
  }

  calculateStorage(plan: BuildPlan): number {
    if (!plan || !plan.storageSize) {
      return 0;
    }
    return parseInt(plan.storageSize, 10) * plan.nodeCount;
  }
}

const STORAGE_TYPES: any[] = [
  new NetworkStorageType(),
  new LocalStorageType(),
];

export { STORAGE_TYPES, StorageType };
