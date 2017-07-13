export class Cidr {
  cidr: string;
  startCidr: string;
  endCidr: string;

  constructor(json: any) {
    this.cidr = json.cidr;
    this.startCidr = json.start_cidr;
    this.endCidr = json.end_cidr;
  }

  static fromJSON(instancesJSON: Array<any>): Cidr[] {
    return instancesJSON.map((json: Object) => new Cidr(json));
  }
}
