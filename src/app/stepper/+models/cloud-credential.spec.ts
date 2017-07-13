/**
 * Created by fl255007 on 5/9/17.
 */
import {CloudCredential, CLOUD_CREDENTIAL_KEY_TYPE, CLOUD_CREDENTIAL_ROLE_TYPE} from "./cloud-credential";

describe('CloudCredential', () => {
  it('Should construct a new instance', () => {
    let credential = new CloudCredential('tester', CLOUD_CREDENTIAL_KEY_TYPE);
    expect(credential).toBeTruthy();
  })

  it('Should determine if the credential is a key', () => {
    let credential = new CloudCredential('tester', CLOUD_CREDENTIAL_KEY_TYPE);
    expect(credential.isKey).toBeTruthy();
  })

  it('Should determine if the credential is a role', () => {
    let credential = new CloudCredential('tester', CLOUD_CREDENTIAL_ROLE_TYPE);
    expect(credential.isRole).toBeTruthy();
  })

  it('Should return the proper type for a key', () => {
    let credential = new CloudCredential('tester', CLOUD_CREDENTIAL_KEY_TYPE);
    expect(credential.type).toEqual('Key');
  })

  it('Should return the proper type for a role', () => {
    let credential = new CloudCredential('tester', CLOUD_CREDENTIAL_ROLE_TYPE);
    expect(credential.type).toEqual('Role');
  })

  it('Should generate an array of credentials from an array of data', () => {
    let data = [
      {"keyname": "key-test", "type": CLOUD_CREDENTIAL_KEY_TYPE},
      {"keyname": "role-test", "type": CLOUD_CREDENTIAL_ROLE_TYPE},
    ];
    let credArray = CloudCredential.fromJSON(data);
    expect(credArray.length).toEqual(2);
  });

  it('Should generate a key type from a data object', () => {
    let data = [
      {"keyname": "key-test", "type": CLOUD_CREDENTIAL_KEY_TYPE}
    ];
    let credArray = CloudCredential.fromJSON(data);
    expect(credArray[0].isKey).toBeTruthy();
  });

  it('Should generate a role type from a data object', () => {
    let data = [
      {"keyname": "role-test", "type": CLOUD_CREDENTIAL_ROLE_TYPE},
    ];
    let credArray = CloudCredential.fromJSON(data);
    expect(credArray[0].isRole).toBeTruthy();
  });

  it('Should export a key as a data object', () => {
    let credential = new CloudCredential('tester', CLOUD_CREDENTIAL_KEY_TYPE, 'access-key', 'secret-key');
    let data = credential.toJSON();
    expect(data.aws_credential.aws_access_key).toEqual('access-key');
    expect(data.aws_credential.aws_secret_key).toEqual('secret-key');
  });

  it('Should export a role as a data object', () => {
    let credential = new CloudCredential('tester', CLOUD_CREDENTIAL_ROLE_TYPE, null, null, 'role');
    let data = credential.toJSON();
    expect(data.aws_role.aws_role_arn).toEqual('role');
  });
});
