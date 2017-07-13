import {Specifics} from "./specifics";
import {PRODUCT_SPECIFICS} from "../../../../../testing/nebula-api/providers/aws/products/product/product_specifics";

describe('Specifics', () => {
  it('Should construct', () => {
    let specifics = new Specifics(PRODUCT_SPECIFICS)
    expect(specifics).toBeTruthy();
  });
  it('Should load from json data', () => {
    let specifics = Specifics.fromJSON(PRODUCT_SPECIFICS)
    expect(specifics).toBeTruthy();
  });
});
