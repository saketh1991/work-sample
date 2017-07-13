import { Sizing } from './product/sizing';
import { Specifics } from './product/specifics';

export class Product {
  id: string;
  awsId: string;
  description: string;
  name: string;
  url: string;
  usecase: string;
  version: string;
  specifics: Specifics;
  sizing: Sizing[];

  constructor(json: any) {
    this.id = json.td_product_id;
    this.awsId = json.aws_product_id;
    this.description = json.td_product_description;
    this.name = json.td_product_name;
    this.url = json.td_product_url;
    this.usecase = json.td_product_usecase;
    this.version = json.td_product_version;
  }

  addSizing(sizingJSON: any): void {
    this.sizing = Sizing.fromJSON(sizingJSON);
  }
}

// {
//     "aws_product_id": "be5ot9tqsbs8xiyi6vy8g5qqq",
//     "td_product_description": "",
//     "td_product_id": "td_dm_1st_edition",
//     "td_product_name": "Data Mover",
//     "td_product_url": "http://",
//     "td_product_usecase": "",
//     "td_product_version": "15.10.01.06-1"
// }
