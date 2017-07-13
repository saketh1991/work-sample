import { Product } from './product';

const PRODUCT_JSON: any = {
  aws_product_id: 'be5ot9tqsbs8xiyi6vy8g5qqq',
  td_product_description: 'Data Mover example',
  td_product_id: 'td_dm_1st_edition',
  td_product_name: 'Data Mover',
  td_product_url: 'http://datamover.example.com',
  td_product_usecase: 'Use Case',
  td_product_version: '15.10.01.06-1',
};

const SIZING_JSON: any = {
  'EBS_SSD': {
    '_id': 3,
    'm4.10xlarge': {
      'InstanceType': 'm4.10xlarge',
      'LaunchConfig': 'EBS20',
      'VolumeCount': 20,
      'VolumeSize': [
        1000,
        250,
      ],
      '_id': 2,
    },
    'm4.16xlarge': {
      'InstanceType': 'm4.16xlarge',
      'LaunchConfig': 'EBS20',
      'VolumeCount': 20,
      'VolumeSize': [
        1000,
        250,
      ],
      '_id': 3,
    },
    'm4.4xlarge': {
      'InstanceType': 'm4.4xlarge',
      'LaunchConfig': 'EBS20',
      'VolumeCount': 20,
      'VolumeSize': [
        1000,
        250,
      ],
      '_id': 1,
    },
  },
  'HDD': {
    '_id': 2,
    'd2.2xlarge': {
      'InstanceType': 'd2.2xlarge',
      'LaunchConfig': 'LocalStorage',
      '_id': 1,
    },
    'd2.8xlarge': {
      'InstanceType': 'd2.8xlarge',
      'LaunchConfig': 'LocalStorage',
      '_id': 2,
    },
  },
  'SSD': {
    '_id': 1,
    'i2.2xlarge': {
      'InstanceType': 'i2.2xlarge',
      'LaunchConfig': 'LocalStorage',
      '_id': 1,
    },
    'i2.8xlarge': {
      'InstanceType': 'i2.8xlarge',
      'LaunchConfig': 'LocalStorage',
      '_id': 2,
    },
  },
};

describe('Product', () => {
  let product: Product;

  beforeEach(() => {
    product = new Product(PRODUCT_JSON);
  });

  it('returns a product instance', () => {
    expect(product.id).toEqual('td_dm_1st_edition');
    expect(product.awsId).toEqual('be5ot9tqsbs8xiyi6vy8g5qqq');
    expect(product.description).toEqual('Data Mover example');
    expect(product.name).toEqual('Data Mover');
    expect(product.url).toEqual('http://datamover.example.com');
    expect(product.usecase).toEqual('Use Case');
    expect(product.version).toEqual('15.10.01.06-1');
  });

  describe('sizing', () => {
    beforeEach(() => {
      product.addSizing(SIZING_JSON);
    });

    it('parses sizing json', () => {
      expect(product.sizing.length).toEqual(3);
      expect(product.sizing[0].id).toEqual(3);
      expect(product.sizing[0].instances.length).toEqual(3);
      expect(product.sizing[0].instances[1].id).toEqual(3);
      expect(product.sizing[0].instances[1].type).toEqual('m4.16xlarge');
    });
  });
});
