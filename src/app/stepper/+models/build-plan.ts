import {Bundle, Instance, Sizing, Specifics, STORAGE_TYPES} from '.';
import {Payload} from './payload/payload';
import {StorageType} from './storage-type';
import {APP_CONFIG} from './app-config';

export class BuildPlan {
  bundle: Bundle;

  /** Plan name */
  planId: string;
  name: string;
  description: string;

  /** Database Storage and Compute */
  _storageType: StorageType;
  _storageMedia: Sizing;
  storageSize: string;
  storageEncryption: string = 'False';
  instanceType: Instance;
  nodeCount: number = 1;

  appConfig: any = APP_CONFIG;

  extraApplications: Array<any> = [
    {id: 'td_dm_1st_edition', name: 'Data Mover', type: 'datamover', selected: false},
  ];

  /** Product specifics */
  _specifics: Specifics;

  constructor() {
    this.bundle = Bundle.load();
  }

  static reset(): void {
    const jwtToken: string = sessionStorage.getItem('jwt_token');
    const username: string = sessionStorage.getItem('username');
    const bundle: string = sessionStorage.getItem('bundle');
    const bundles: string = sessionStorage.getItem('bundles');

    sessionStorage.clear();
    sessionStorage.setItem('bundle', bundle);
    sessionStorage.setItem('jws_token', jwtToken);
    sessionStorage.setItem('token_id', jwtToken);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('bundles', bundles);
  }

  /** Validations */
  isPlanNameValid(): boolean {
    return !!this.name;
  }

  isStorageAndComputeValid(): boolean {
    let valid: boolean = !!this._storageType && !!this._storageMedia && !!this.instanceType && !!this.nodeCount;

    if (valid && (this.nodeCount < this.minNodes || this.nodeCount > this.maxNodes)) {
      valid = false;
    }

    if (valid && this.storageType && this.storageType.sizes) {
      valid = valid && !!this.storageSize;
    }

    return valid;
  }

  isValid(): boolean {
    return this.isPlanNameValid() && this.isStorageAndComputeValid();
  }

  // Prevent the user from entering the invalid numbers
  preventInputHigherThanTwo(e): void {
   
    if ( this.nodeCount >= this.maxNodes ) {
         this.nodeCount = this.maxNodes;
    }
   else if (this.nodeCount <= this.minNodes) {
      this.nodeCount = this.minNodes; 
    }
    
  }

  preventHigherInputArrow(): void {
    if ( this.nodeCount >= this.maxNodes ) {
         this.nodeCount = this.maxNodes;
    }
    else if (this.nodeCount <= this.minNodes) {
      this.nodeCount = this.minNodes; 
    }
  }

  /** Session persistence */
  toJSON(): any {
    return {
      bundle: this.bundle.code,
      bundleName: this.bundleName,
      planId: this.planId,
      name: this.name,
      description: this.description,
      storageTypeName: this.storageTypeName,
      storageMediaName: this.storageMediaName,
      storageSize: this.storageSize,
      instanceTypeName: this.instanceTypeName,
      nodeCount: this.nodeCount,
      selectedIncludedApplications: this.selectedIncludedApplications,
      selectedExtraApplications: this.selectedExtraApplications,
      totalStorage: this.totalStorage,
      totalVCore: this.totalVCore,
      totalMemory: this.totalMemory,
      networkPerformance: this.networkPerformance,
      totalThroughput: this.totalThroughput,
      throughput: this.throughput,
    };
  }

  storedAttributes(): any {
    return JSON.parse(sessionStorage.getItem('nebulaBuildPlan'));
  }

  load(json?: any): boolean {
    if (json === undefined) {
      json = JSON.parse(sessionStorage.getItem('nebulaBuildPlan'));
    }

    if (!json) {
      return;
    }

    // only loads plan if bundle hasn't changed
    if (this.bundle.code !== json.bundle) {
      BuildPlan.reset();
      return;
    }

    this.planId = json.planId;
    this.name = json.name;
    this.description = json.description;

    if (json.storageTypeName) {
      this._storageType = STORAGE_TYPES.find((s: StorageType) => s.type === json.storageTypeName);
      this._storageMedia = this.storageType.sizings.find((s: Sizing) => s.type === json.storageMediaName);
      this.storageSize = json.storageSize;
      this.instanceType = this._storageMedia.instances.find((i: Instance) => i.type === json.instanceTypeName);
      this.nodeCount = json.nodeCount;
    }

    if (json.selectedIncludedApplications) {
      this.includedApplications.forEach((app: any) => {
        app.selected = !!json.selectedIncludedApplications.find((a: any) => a.name === app.name); // Here
      });
    }

    if (json.selectedExtraApplications) {
      this.extraApplications.forEach((app: any) => {
        app.selected = !!json.selectedExtraApplications.find((a: any) => a.name === app.name); // Here
      });
    }

    return false;
  }

  save(): void {
    sessionStorage.setItem('nebulaBuildPlan', JSON.stringify(this.toJSON()));
  }

  reset(): void {
    const jwtToken: string = sessionStorage.getItem('jwt_token');
    const username: string = sessionStorage.getItem('username');
    const bundle: string = sessionStorage.getItem('bundle');
    const bundles: string = sessionStorage.getItem('bundles');

    sessionStorage.clear();
    sessionStorage.setItem('bundle', bundle);
    sessionStorage.setItem('jws_token', jwtToken);
    sessionStorage.setItem('token_id', jwtToken);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('bundles', bundles);
  }

  saveInstanceSettings(): void {
    const data: any = {
      appvolume: this.nodeCount,
      selected_instance: this.instanceTypeName,
      total_storage: this.totalStorage,
      total_memory: this.totalMemory,
      storage_type: this.storageTypeName,
      appstorage: this.storageMediaName,
      throughput: this.throughput,
      network_performance: this.networkPerformance,
      appname: this.name,
    };

    sessionStorage.setItem('instance_calculator', JSON.stringify(data));
  }

  toExecutionPayload(): any {
    const deployConfig: any = JSON.parse(sessionStorage.getItem('tddbconfig'));
    const appsConfig: any = {};
    const credentialName: string = sessionStorage.getItem('cloudname');

    ['db', 'serverManagement', 'dsc', 'dataMover'].forEach((setting: string) => {
      const key: string = `${setting}Config`;
      const settings: any = JSON.parse(sessionStorage.getItem(`config-apps-${key}`));
      if (settings) {
        appsConfig[key] = settings;
      }
    });

    const serverManagementConfig: any = appsConfig.serverManagementConfig || {};

    // TODO question: should we only include properties for the apps
    //                that were selected?
    // TODO question: the key was hardcoded as chris_key, what should we use?
    // TODO question: the credentials key was harcoded as dangawscred, what
    //                should we use?
    // TODO question: we're not handling dsc settings, are those supposed to
    //                be ignored?

    const executionPayload: Payload = new Payload();
    executionPayload.plan_id = sessionStorage.getItem('plan_id');
    executionPayload.region = deployConfig.region;
    executionPayload.system_time_zone = appsConfig.dbConfig.timezone;
    executionPayload.vpc_id = deployConfig.vpc;
    executionPayload.credentials = credentialName;
    executionPayload.availability_zone = deployConfig.availability_zone;

    if (deployConfig.reused_subnet) {
      executionPayload.common_subnet_existing = {
        subnet_id: deployConfig.reused_subnet.subnet_id,
      };
    } else {
      executionPayload.common_subnet = {
        subnet_name: deployConfig.public_subnet,
        cidr: deployConfig.cidr,
      };
    }

    executionPayload.addPublicKey(deployConfig.public_key);

    executionPayload.addTddbs({
      db_kanji_support: appsConfig.dbConfig.kanjiSupport,
      db_nickname: appsConfig.dbConfig.nickname,
      db_system_name: appsConfig.dbConfig.systemName,
      dbc_password: appsConfig.dbConfig.password,
    });

    if (this.hasIncludedApp('cmic')) {
      executionPayload.addServiceManagement({
        sm_site_id: serverManagementConfig.siteId,
        sm_rest_password: serverManagementConfig.restPassword,
        sm_password: serverManagementConfig.password,
      });
    }

    // TODO: this key is wrong
    if (this.hasIncludedApp('dsu')) {
      executionPayload.addDsc();
    }

    if (this.hasIncludedApp('rest')) {
      executionPayload.addRest();
    }

    if (this.hasIncludedApp('em')) {
      executionPayload.addEcosystemManager();
    }

    if (this.hasIncludedApp('vp')) {
      executionPayload.addViewpoint();
    }

    if (this.hasDataMover()) {
      executionPayload.addDataMover({
        dm_datamover_password: appsConfig.dataMoverConfig.password,
        dm_dbc_password: appsConfig.dataMoverConfig.repositoryPassword,
      });
    }

    return executionPayload.payload;
  }

  toCreatePayload(): any {
    const payload: any = {
      plan: {
        properties: {
          plan_name: this.name,
          plan_description: this.description,
          provider: 'aws',
          tdplan_type: this.bundle.name,
        },
        common_subnet: {
          subnet_name: 'public-subnet',
        },
        deployment_bundle: [
          {
            configuration: {
              td_product_id: this.bundle.code,
              system_name: 'a teradata database application',
              system_type: 'tddbs',
            },
            instances: {
              count: this.nodeCount,
              type: this.instanceTypeName,
            },
          },
        ],
      },
    };

    if (this.storageSize) {
      payload.plan.deployment_bundle[0].instance_volumes = {
        size_in_terabytes: parseInt(this.storageSize, 10),
        encryption: this.storageEncryption,
        type: 'ebs_gp2',
      };
    }

    const allApps: any[] = this.selectedIncludedApplications.concat(this.selectedExtraApplications);
    allApps.forEach((app: any) => payload.plan.deployment_bundle.push(this.appConfig[app.type]));

    return payload;
  }

  hasDataMover(): boolean {
    let json: any = this.data;

    if (json.selectedExtraApplications) {
      return !!json.selectedExtraApplications.find((app: any) => app.type === 'datamover');
    }
    return false;
  }

  hasIncludedApp(type: any): boolean {
    let json: any = this.data;

    if (json.selectedIncludedApplications) {
      return !!json.selectedIncludedApplications.find((app: any) => app.type === type);
    }

    return false;
  }

  get bundleName(): string {
    return this.bundle.name;
  }

  get instanceTypeName(): string {
    if (!this.instanceType) {
      return undefined;
    }
    return this.instanceType.type;
  }

  get storageTypeName(): string {
    if (!this.storageType) {
      return undefined;
    }
    return this.storageType.type;
  }

  get storageMediaName(): string {
    if (!this.storageMedia) {
      return undefined;
    }
    return this.storageMedia.type;
  }

  get productId(): string {
    if (!this.bundle) {
      return undefined;
    }

    return this.bundle.code;
  }

  get includedApplications(): Array<any> {
    if (!this.bundle) {
      return undefined;
    }

    return this.bundle.products;
  }

  get storageType(): StorageType {
    return this._storageType;
  }

  set storageType(s: StorageType) {
    this.storageSize = undefined;
    this.storageMedia = undefined;
    this.instanceType = undefined;
    this.nodeCount = 1;

    if (s.sizings.length > 0) {
      this.storageMedia = s.sizings[0];
    }
    this._storageType = s;
  }

  get storageMedia(): Sizing {
    return this._storageMedia;
  }

  set storageMedia(s: Sizing) {
    this.instanceType = undefined;

    this._storageMedia = s;
  }

  get productSpecifics(): Specifics {
    return this._specifics;
  }

  set productSpecifics(s: Specifics) {
    this._specifics = s;
  }

  get nodeLimit(): any {
    if (!this._specifics) {
      return undefined;
    }
    return this._specifics.nodelimit;
  }

  get maxNodes(): number {
    if (!this.nodeLimit) {
      return undefined;
    }

    return parseInt(this.nodeLimit.maximum, 10);
  }

  get minNodes(): number {
    if (!this.nodeLimit) {
      return undefined;
    }

    return parseInt(this.nodeLimit.minimum, 10);
  }

  get selectedIncludedApplications(): any[] {
    return this.includedApplications.filter((a: any) => a.selected);
  }

  get selectedExtraApplications(): any[] {
    return this.extraApplications.filter((a: any) => a.selected);
  }

  /** Plan summary */
  get isInstanceSelected(): boolean {
    return this.instanceType && this.instanceType.details;
  }

  get canCalculate(): boolean {
    return this.isInstanceSelected && !!this.nodeCount;
  }

  get totalMemory(): number {
    if (!this.canCalculate) {
      return undefined;
    }

    return this.instanceType.memory * this.nodeCount;
  }

  get totalVCore(): number {
    if (!this.canCalculate) {
      return undefined;
    }

    return this.instanceType.vCPU * this.nodeCount;
  }

  get totalStorage(): number {
    if (!this.storageType) {
      return undefined;
    }
    return this.storageType.calculateStorage(this);
  }

  get storageThroughput(): number {
    if (!this.isInstanceSelected) {
      return undefined;
    }

    if (this.storageType && this.storageType.type === 'Network') {
      return this.instanceType.storageThroughput * this.nodeCount;
    }

    return this.instanceType.storageThroughput;
  }

  get networkPerformance(): string {
    if (!this.isInstanceSelected) {
      return undefined;
    }
    return this.instanceType.networkPerfomance;
  }

  get throughput(): number {
    if (!this.isInstanceSelected) {
      return undefined;
    }
    if (!this.instanceType.ebsMaxBandwidth) {
      return undefined;
    }
    return this.instanceType.ebsMaxBandwidth / 1000;
  }

  get totalThroughput(): number {
    if (this.throughput && this.nodeCount) {
      return this.throughput * this.nodeCount;
    }
  }

  get data(): any {
    const str: string = sessionStorage.getItem('nebulaBuildPlan');
    return JSON.parse(str);
  }
}
