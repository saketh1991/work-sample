export class Specifics {
  concurrency: string;
  nodelimit: any;
  support: string;

  constructor(json: any) {
    this.concurrency = json.concurrency.charAt(0).toUpperCase() + json.concurrency.slice(1);
    this.nodelimit = json.nodelimit;
    this.support = json.support;
  }

  static fromJSON(json: any): Specifics {
    return new Specifics(json);
  }
}
