/**
 * Created by fl255007 on 5/9/17.
 */
import {Bundle} from "./bundle";
const SAMPLE_BUNDLE = {
  id: 1,
  code: "test-code",
  name: "test-bundle",
  color: "test-color",
  description: "test-description",
  products: ["test-product"],
  specifics: "test-specific",
  storages: {local: ['local-storage'], network: ['network-storage']}
};

describe('Bundle', () => {
  it('Should construct', () => {
      let bundle = new Bundle(SAMPLE_BUNDLE);
      expect(bundle).toBeTruthy();
  });

  it('Should construct from a data object', () => {
      let bundle = Bundle.fromJSON(SAMPLE_BUNDLE);
      expect(bundle).toBeTruthy();
  });

  it('Should confirm that a bundle is advanced', () => {
    let data = SAMPLE_BUNDLE;
    data.name = 'Advanced';
    let advancedBundle = new Bundle(data);
    expect(advancedBundle.isAdvanced).toBeTruthy();
  });

  it('Should load advanced db features', () => {
    let data = SAMPLE_BUNDLE;
    data.name = 'Advanced';
    let advancedBundle = new Bundle(data);
    let advancedFeatures = ['Intelligent Memory', 'Workload Management: TIWM'];
    advancedFeatures.forEach((feature) => {
      expect(advancedBundle.database.indexOf(feature)).toBeTruthy();
    });
  });

  it('Should confirm that a bundle is enterprise', () => {
    let data = SAMPLE_BUNDLE;
    data.name = 'Enterprise';
    let entBundle = new Bundle(data);
    expect(entBundle.isEnterprise).toBeTruthy();
  });


  it('Should load enterprise db features', () => {
    let data = SAMPLE_BUNDLE;
    data.name = 'Enterprise';
    let entBundle = new Bundle(data);
    let entFeatures = ['Intelligent Memory', 'In-Memory Optimization', 'Workload Management: TASM'];
    entFeatures.forEach((feature) => {
      expect(entBundle.database.indexOf(feature)).toBeTruthy();
    });
  });

  it('Should save to the session', () => {
    let bundle = new Bundle(SAMPLE_BUNDLE);
    bundle.save();
    let savedData = JSON.parse(sessionStorage.getItem('bundle'));
    expect(savedData.name).toEqual(bundle.name);
    expect(savedData.code).toEqual(bundle.code);
    expect(savedData.products).toEqual(bundle.products);
  });

  it('Should load from the session', () => {
    let bundle = new Bundle(SAMPLE_BUNDLE);
    bundle.save();

    bundle.load();
    expect(bundle.name).toEqual(bundle.name);
    expect(bundle.code).toEqual(bundle.code);
    expect(bundle.products).toEqual(bundle.products);
  });
  it('Should load from the session - static', () => {
    let bundle = new Bundle(SAMPLE_BUNDLE);
    bundle.save();

    let savedData = Bundle.load();
    expect(savedData.name).toEqual(bundle.name);
    expect(savedData.code).toEqual(bundle.code);
    expect(savedData.products).toEqual(bundle.products);
  });

});
