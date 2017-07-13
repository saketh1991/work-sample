import { Specifics } from './product/specifics';

export class Bundle {
  id: number;
  code: string;
  name: string;
  color: string;
  database: Array<string> = ['Columnar', 'Temporal', 'Row-Level Security', 'Secure Zones'];
  description: string;
  products: Array<any> = [];
  specifics: Specifics;
  storages: any = { local: [], network: [] };

  constructor(json: any = {}) {
    Object.assign(this, json);

    let extraDatabaseFeatures: Array<string> = [];

    if (this.isEnterprise) {
      extraDatabaseFeatures = ['Intelligent Memory', 'In-Memory Optimization', 'Workload Management: TASM'];
    }

    if (this.isAdvanced) {
      extraDatabaseFeatures = ['Intelligent Memory', 'Workload Management: TIWM'];
    }

    this.database = this.database.concat(extraDatabaseFeatures);
  }

  static fromJSON(bundleJSON: any): Bundle {
    return new Bundle(bundleJSON);
  }

  static load(): Bundle {
    return Bundle.fromJSON(JSON.parse(sessionStorage.getItem('bundle')));
  }

  load(): void {
    Object.assign(this, JSON.parse(sessionStorage.getItem('bundle')));
  }

  save(): void {
    sessionStorage.setItem('bundle', JSON.stringify({ name: this.name, code: this.code, products: this.products }));
  }

  get isAdvanced(): boolean {
    return this.name === 'Advanced';
  }

  get isEnterprise(): boolean {
    return this.name === 'Enterprise';
  }
}
