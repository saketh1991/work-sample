import {Cidr} from "./cidr";

describe('Cidr', () => {
  it('Should construct', () => {
    let cidr = new Cidr({"cidr": "cidr", "start_cidr": "start", "end_cidr": "end"});
    expect(cidr).toBeTruthy();
  });
  it('Should load an array of cidrs', () => {
    let data = [{"cidr": "test-cidr", "start_cidr": "start", "end_cidr": "end"}];
    let cidrArray = Cidr.fromJSON(data);
    let cidr = cidrArray[0];
    expect(cidr.cidr).toEqual('test-cidr');
  });
});
