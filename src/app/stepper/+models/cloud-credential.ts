const CLOUD_CREDENTIAL_KEY_TYPE: string = 'aws_credential';
const CLOUD_CREDENTIAL_ROLE_TYPE: string = 'aws_role';

class CloudCredential {
  constructor(public name: string,
              private _type: string,
              public accessKey?: string,
              public secretKey?: string,
              public role?: string) { }

  static fromJSON(json: any): CloudCredential[] {
    return json.map((item: any) => new CloudCredential(item.keyname, item.type));
  }

  get type(): string {
    if (this.isKey) {
      return 'Key';
    }

    if (this.isRole) {
      return 'Role';
    }
  }

  get isKey(): boolean {
    return this._type === CLOUD_CREDENTIAL_KEY_TYPE;
  }

  get isRole(): boolean {
    return this._type === CLOUD_CREDENTIAL_ROLE_TYPE;
  }

  toJSON(): any {
    if (this.isKey) {
      return {
        keyname: this.name,
        aws_credential: {
          aws_access_key: this.accessKey,
          aws_secret_key: this.secretKey,
        },
      };
    }

    if (this.isRole) {
      return {
        keyname: this.name,
        aws_role: {
          aws_role_arn: this.role,
        },
      };
    }
  }
}

export { CloudCredential, CLOUD_CREDENTIAL_KEY_TYPE, CLOUD_CREDENTIAL_ROLE_TYPE };
