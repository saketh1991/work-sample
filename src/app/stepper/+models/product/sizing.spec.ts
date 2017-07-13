import {Sizing} from "./sizing";
import {SIZING} from "../../../../../testing/nebula-api/providers/aws/products/product/sizing";
import {INSTANCES} from  "../../../../../testing/nebula-api/providers/aws/instances";

describe('Sizing', () => {
  it('Should construct', () => {
    let sizing = new Sizing('HDD', 'd2.xlarge', SIZING['HDD']['d2.xlarge']);
    expect(sizing).toBeTruthy();
  });
  it('Should load from json data', () => {
    let sizings = Sizing.fromJSON([SIZING['HDD']]);
    expect(sizings.length).toEqual(1);
  });
  it('Should load instance details', () => {
    let sizing = new Sizing('HDD', 'd2.xlarge', SIZING['HDD']['d2.xlarge']);
    sizing.loadInstanceDetails(INSTANCES);

    expect(sizing.instances.length).toEqual(2);
  });
});
