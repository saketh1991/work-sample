//noinspection ES6UnusedImports
import {Component, ViewChild, AfterViewInit,OnInit,AfterViewChecked, ElementRef, Output} from '@angular/core';
//noinspection ES6UnusedImports
import {Router, ActivatedRoute, Data, RouterModule } from '@angular/router';
import {Injectable} from '@angular/core';

import {StepState} from '@covalent/core';



import {planService, databaseService} from '../../../services';


// import { NG2_DROPDOWN_DIRECTIVES } from 'ng2-material-dropdown';



import {TdDigitsPipe, TdBytesPipe, TdTimeAgoPipe} from '@covalent/core';


import {IStepChangeEvent} from '@covalent/core';


import {CovalentCoreModule} from '@covalent/core';
import {TimezoneService} from '../../../services';
import {RegionService} from '../../../services';

@Component({
  moduleId: 'module.id',
  selector: 'qs-config',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],

  viewProviders: [planService, databaseService, TimezoneService, RegionService],


  host: {'class': 'ng-animate page1Container'},

})

@Injectable()
export class stepperComponent implements OnInit,AfterViewInit ,AfterViewChecked{

  //noinspection JSUnusedLocalSymbols,JSUnusedLocalSymbols
  constructor(private router: Router, private regionservice: RegionService, private timezoneservice: TimezoneService, private route: ActivatedRoute, private PlanService: planService, private databaseservice: databaseService) {
    this.plan = PlanService;
    // this.http=http;


  }

  expand: boolean = false;
  disabled_col: boolean = false;

  //noinspection JSMethodCanBeStatic
  expandedEvent(): void {
    console.log("expanded");
  }

  //noinspection JSMethodCanBeStatic
  collapsedEvent(): void {
    console.log("closed");
  }

  plan_nav():any{

    this.router.navigate(['/dashboard/tdplans']);

  }
  items: Object[];
  type: any;
  resources: Object[];

  applications :any=[{'name':'Viewpoint Single System','checked':false},
    {'name':'Server Management','checked':false},{'name':'REST Services','checked':false},
    {'name':'Data Stream Controller','checked':false},{'name':' Ecosystem Manager ','checked':false}];

  selected_applications:any[];
  timezones: any;
  timezone: string = "US/Pacific";
  status: string = '';
  result: any;
  showConfig: boolean = true;
  showDash: boolean = false;
  plan: any;

  //noinspection JSUnusedLocalSymbols
  private date;
  statusCode: any = -1;
  appname: string = null;
  appplan: string;
  apptype: string = null;
  appvolume: number = 1;
  appvol: number = 1;
progress:any;
  appinstance: string = null;
  appstorage: string = null;
  instance: any;
  storage_Type:any=null;

  storage_Types_1:any=[]
  regions: any;
  region: string = 'us-west-2';

  data: any;
  @ViewChild('app_volume') app_volume: ElementRef;

  @ViewChild('step') step: ElementRef;
  @ViewChild('tddb') tddb: ElementRef;
  @ViewChild('app_bundle') app_bundle: ElementRef;

  @ViewChild('app_features') app_features: ElementRef;
  @ViewChild('app_region') app_region: ElementRef;
  @ViewChild('app_instance') app_instance: ElementRef;
  @ViewChild('app_storage') app_storage: ElementRef;

  state: StepState;
  a: Object;
  plans: any = ['Developer', 'Data Mart', 'Enhanced', 'Plan D'];
  types = ['General Purpose', 'Storage Optimized'];
  storage_types: any =[];
  hdd_instance_type: Object = ['6 TB', '12 TB', '24 TB', '48 TB'];
  ssd_instance_type: Object = ['800 GB', '1.6 TB', '3.2 TB', '6.4 TB'];
  ebs_instance_type: Object = ['5 TB', '20 TB'];
  additional_features: Object= [{'name':'Data Mover','checked':false}];
  output: Object = {};
  deploy_toggle: boolean = false;
  bundle_details:any;


  activeEvent(): void {
    console.log("name");
    this.step['active'] = true;
    this.step['_disabled'] = false;
    // this.app_features['state'] = StepState.Complete;
  };

  deactiveEvent(): void {


    if (this.appname == undefined) {
      this.step['state'] = StepState.None;

    }

    else {
      console.log(this.appname);
      this.step['active'] = false;
      this.a = this.appname.match(/demo/gi);

      if (this.a == null) {

        this.step['state'] = StepState.Required;

      }
      else {
        console.log("!!!!!");
        this.deploy_toggle = true;
        this.step['state'] = StepState.Complete;

      }
    }
this.activeStorage();

  }


  ebs_storage= ['Select storage','5','20'];

  ebs_storage_type:any;

  activeTdDb(): void {
    // this.tddb['active'] = true;
    // this.tddb['_disabled'] = false;
    // this.step['state'] = StepState.Complete;
  }

  deactiveTdDb(): void {


    // this.tddb['active'] = false;
    //
    //
    // var flag = 0;
    // if (this.appplan == "none") {
    //   this.tddb['state'] = StepState.Required;
    //   this.tddb['_deactive'] = false;
    //
    // }
    // else {
    //   this.activeStorage();
    // }

  }


  // volumechange(): void {
  //
  //   if (this.appvol == 1) {
  //     this.appvolume = 1;
  //   }
  //   if (this.appvol == 7) {
  //     this.appvolume = 2;
  //     // alert("@@@");
  //   }
  //   if (this.appvol == 13) {
  //     this.appvolume = 4;
  //   }
  //   if (this.appvol == 19) {
  //     this.appvolume = 8;
  //   }
  //   if (this.appvol == 25) {
  //     this.appvolume = 16;
  //   }
  //   if (this.appvol == 31) {
  //     this.appvolume = 32;
  //   }
  //
  // }
throughput:any;
  totalstorage:any= null;
  getTotalStorage(): number {
    this.display_storage =  this.total_storage.toString();
    this.totalstorage = this.total_storage;
    if (this.appstorage !== 'EBS_SSD') {
      this.display_storage =  (this.total_storage / 1000).toString();
      this.totalstorage = this.total_storage/1000;
      return this.totalstorage;
// this.total_storage = this.total_storage/1000;
    }
// console.log(this.display_storage,"@@@@selected instance")
    // this.total_vcore = this.selected_item['vCPU'] * this.appvolume;
//     this.total_memory = this.selected_item.memory * this.appvolume;
// this.throughput = this.selected_item['ebs_max_bandwidth']
//
//     return this.display_storage;

    return this.total_storage;
  }

  activeStorage(): void {

    this.app_storage['active'] = true;
    this.app_storage['_disabled'] = false;
    this.step['_state'] = StepState.Complete;

  }

  card_data:any=[];

  deactiveStorage(): void {

    if (this.appstorage == null) {
      this.app_storage['state'] = StepState.Required;
      this.app_storage['_deactive'] = false;
    }
    else {

      this.app_storage['active'] = false;
      // this.activeRegion();
      this.activeAppbundle();
    }
  }


  activeRegion(): void {

    this.timezoneservice.query().subscribe(
      res=> this.timezones = res,
      error => console.log(error)
    );
    this.regionservice.query().subscribe(
      res=> this.regions = res,
      error => console.log(error)
    );
      this.app_region['active'] = true;
      this.app_region['_disabled'] = false;
      this.app_storage['_state'] = StepState.Complete;


  }

  deactiveRegion(): void {


    this.app_region['active'] = false;
    this.app_region['_state'] = StepState.Complete;
    this.activeAppbundle();

  }
  activeAppbundle(): void {

    this.app_bundle['active'] = true;
    this.app_bundle['_disabled'] = false;
    this.app_storage['_state'] = StepState.Complete;
  }
  deactiveAppbundle(): void {

    this.app_bundle['active']=false;
    this.app_bundle['_state']= StepState.Complete;

    this.activeFeatures();

  }
  activeFeatures(): void {
    this.app_features['active'] = true;
    this.app_features['_disabled'] = false;
    this.app_bundle['_state'] = StepState.Complete;


    this.app_features['active'] = true;
    this.app_features['_disabled'] = false;
    this.app_bundle['_state'] = StepState.Complete;
  }

   deactiveFeatures(): void {

    this.app_features['active']=false;
    this.app_features['_state']= StepState.Complete;


    // this.activeEvent();

  }
  res: any = "success";
  next_page():void{
    this.deploy();
    this.build_data();

    this.router.navigate(['/dashboard/appverify']);
  }
  build_data():void{
    let d = {'appvolume':this.appvolume,
      'selected_instance':this.selected_instance,
      'total_storage':this.totalstorage,
      'total_vcore':this.total_vcore,
      'total_memory':this.total_memory,
      'storage_Type':this.storage_Type,
      'appstorage':this.appstorage,
      'throughput':this.throughput,
      'network_performance':this.network_performance,
      'appname':this.appname};
    sessionStorage.setItem('instance_calculator',JSON.stringify(d));
  }
  appdesc:any= '';

  generate_storage(t):any{
this.storage_types = this.storage_types_2;
    console.log(this.storage_types,this.storage_types_2)
    if(t == 'Local'){
      if(this.storage_types.includes('EBS_SSD')){
        this.storage_types = ['SSD','HDD'];
        this.appstorage = 'SSD';
        this.generate_vol('SSD')
      }
    }
    else{
      if(this.storage_types.includes('SSD')){
        this.storage_types = ['EBS_SSD']
      }
      if(this.storage_types.includes('HDD')){
        this.storage_types=['EBS_SSD']
      }

    }

  }
  deploy(): void {
    console.log(this.selected_item,"!!!!!!");

    let req = {'storage_type':this.appstorage,'apps':this.applications,'additional_features':this.additional_features,'plan_desc':this.appdesc,'plan_name':this.appname,'plan_type':this.appplan,'instance_type':this.selected_item.instance_type,'volume_count':this.appvolume,'ebs_storage_type':parseInt(this.ebs_storage_type)};
    this.deactiveEvent();
    console.log("deploying");
    this.PlanService.query(req).subscribe(data=> {

      sessionStorage.setItem('plan_id',data['environments_post_payload']['plan_id']);
      console.log(sessionStorage.getItem('plan_id'))

    })

  }
  //noinspection JSUnusedLocalSymbols
  goBack(route: string): void {
    this.router.navigate(['/']);
  }

  cancel(): void {
    // this.stopConfig();
    this.router.navigate(['/home'])
  }
  generate_vol(t):void{
    if(t != 'EBS_SSD'){
       console.log(t,"@@@@",typeof t);
      this.card_data=[];
       console.log(this.instance_data,"!!!",this.list_storages,"@@@@",this.storage_types,"$$$$",this.storage_map);

      for (let k of this.storage_map[t]){

        if(k !=  '_id') {
          this.card_data.push(this.instance_data[k])
        }

      }

       // console.log(this.card_data,"@@@@")
    }}


  sort_list = [];
  //noinspection JSUnusedLocalSymbols
  ebs_generate_vol(t){
    let r = Object.keys(this.bundle_details['EBS_SSD'])
    let u = this.bundle_details['EBS_SSD'];
    let q = [];
    for (let y of r){
      if(y != '_id'){
      console.log(y,"%%%%%%");
        let uu = u[y]
      let  uuu= {};
        uuu['name']=y;
        uuu['_id']= uu['_id'];
      q.push(uuu);
    }}
    this.sort_list = q;
    this.sort_list.sort(function(a, b) {
      return a._id - b._id;
    })

    this.card_data=[];
    let keys = [];
    for(let k of this.sort_list){
      console.log(this.sort_list,k)
      keys.push(k['name'])
    }
    console.log(r,"RTRTRTRTRT",keys)
    // console.log(this.instance_data,"!!!",this.list_storages,"@@@@",this.storage_types,"$$$$",this.storage_map);
    // for (let k of this.storage_map['EBS_SSD']){
    for (let k of keys){

      if(k !=  '_id') {
        this.card_data.push(this.instance_data[k])
      }
      // console.log(this.instance_data,"$$$$$$$",k);
      // console.log(this.card_data,"@@@@",this.bundle_details['EBS_SSD'])
    }

  if(this.selected_instance != null){
let d = this.selected_instance;
    // this.selected_instance= null;
    this.instance_selector(d)
    this.ebs_generate_vol(t)
  }

  }
  temp:any=[];
  total_vcore:any;
  total_memory:any;
  total_storage:any=0;
  display_storage:any ='-';

  selected_item:any= null;
  instance_size: any;
  network_performance:any;


  selected_instance:any = null;
  instance_selector(d):void{
    this.selected_item=d;

    this.selected_instance= this.selected_item.instance_type;
    if (this.appstorage === 'EBS_SSD'){
      this.total_storage  = parseInt(this.ebs_storage_type);
      this.total_vcore = this.selected_item['vCPU'] * this.appvolume;
      this.total_memory = this.selected_item.memory  * this.appvolume;
      this.display_storage= this.total_storage.toString();
    }

    if(this.appvolume ==1 && this.appstorage != 'EBS_SSD' ) {
      this.total_vcore = this.selected_item['vCPU'] * this.appvolume;
      this.total_memory = this.selected_item.memory * this.appvolume;
      this.total_storage = this.selected_item['storage']['devices'] * this.selected_item['storage']['size'] * this.appvolume;
      this.display_storage = this.total_storage.toString();
      this.instance_size = d.storage.devices * d.storage.size;
    }
      this.network_performance=d['network_performance'];
    this.throughput = this.selected_item['ebs_max_bandwidth']
    }
  instance_calculator(value):void{

    this.appvolume= value;
    if (this.appstorage === 'EBS_SSD'){
      this.total_storage  = parseInt(this.ebs_storage_type)* this.appvolume;
      this.total_vcore = this.selected_item['vCPU'] * this.appvolume;
      this.total_memory = this.selected_item.memory * this.appvolume ;
      this.selected_instance= this.selected_item.instance_type;
      this.display_storage= this.total_storage.toString();
    }

    else
    {
      this.total_vcore = this.selected_item['vCPU'] * this.appvolume;
      this.total_memory = this.selected_item.memory * this.appvolume;
      this.total_storage = this.selected_item['storage']['devices'] * this.selected_item['storage']['size'] * this.appvolume;
      console.log(this.selected_item,"@@@@");
      this.selected_instance= this.selected_item.instance_type;
      this.display_storage= this.total_storage.toString();
    }
    // console.log(this.selected_item,this.selected_instance,"RRRR")
    this.network_performance=this.selected_item['network_performance'];
    this.throughput = this.selected_item['ebs_max_bandwidth']

  }





  storage_map:any = {};

  instance_data=[];
  list_storages:any=[];
  instance_type:any;
  node_limit:any;
  storage_types_2:any=[];
  ngOnInit():void {
this.progress=sessionStorage.getItem('progress');
      this.PlanService.node_limit(JSON.parse(sessionStorage.getItem('bundle'))['code']).subscribe(data=>{
      this.node_limit= data['nodelimit'];

    });


    this.appplan = JSON.parse(sessionStorage.getItem('bundle'))['name'];
  if(this.appplan == 'Developer'|| this.appplan == 'Base' ){
    this.storage_Types_1=['Local']

  }
  else{
    this.storage_Types_1=['Network','Local']
  }
    this.PlanService.bundle_detail().subscribe(data => {
      this.bundle_details= data;
      this.storage_types= Object.keys(data);
      this.storage_types_2=Object.keys(data);

      for(let k of this.storage_types){

// this.list_storages = this.list_storages+ Object.keys(data[k])
        // console.log(Object.keys(data[k]))
        this.list_storages.push(Object.keys((data[k])))
      }

    });

    this.PlanService.instance_details().subscribe(data=>{

      this.instance_type= data;
      //noinspection JSUnusedLocalSymbols
      let a= [];


      // for (let i = 0 ;i< this.list_storages.length;i++){
      //   for (let j = 0;j < this.list_storages[i].length;j++){
      //     a.push(this.list_storages[i][j])
      //   }
      // }

      // this.list_storages= a;
      // console.log(this.instance_type)

      let x = {};
      for (let i = 0; i < this.instance_type['instance_types'].length;i++){
        for(let j = 0;j <this.list_storages.length;j++){
          // console.log(this.instance_type[i]['instance_type'])
          // console.log(this.list_storages[i])
          for(let k = 0 ;k <this.list_storages[j].length;k++){
            if(this.list_storages[j][k].indexOf(this.instance_type['instance_types'][i]['instance_type'] )!= -1) {
// console.log(this.list_storages[j]);
              x[this.list_storages[j][k]] = this.instance_type['instance_types'][i];
              this.instance_data.push(x);
            }
          }
        }}
    // this.list_storages = this.list_storages.reverse()
      this.instance_data= this.instance_data[0];

      for ( let i = 0; i < this.storage_types.length; i++) {
        this.storage_map[this.storage_types[i]] = this.list_storages[i];
        // if(i==0){
        //   let x = []
        //   console.log("FFFFF",this.list_storages[i])
        //   let d = this.list_storages[i].reverse()
        //   this.temp = d;
        //   // this.storage_map[this.storage_types[i]] = d;
        //   console.log(d,"QQQQ",this.list_storages[i])
        //
        //   x.push('_id');
        //   for(let i= 0 ;i <d.length;i++){
        //     x.push(this.temp[i])
        //   }
        //   x.pop();
        //   console.log(x,"TTTTT",typeof x)
        //   this.storage_map[this.storage_types[i]] = x;
        // }
        // else {
        //   console.log(this.list_storages[i],"YYYYYY",typeof this.list_storages[i])
        //   this.storage_map[this.storage_types[i]] = this.list_storages[i];
        // }


      }


    });


    this.items = [{
      title: 'Activity Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
      color: 'pink-A200',
      description: 'View a dashboard of latest activity!',
    }, {
      title: 'Manage Users',
      route: '/users',
      icon: 'people',
      color: 'light-blue-700',
      description: 'View an admin management list of users!',
    }
    ];


    if(sessionStorage.getItem('viewpointdata')){
      let d = JSON.parse(sessionStorage.getItem('viewpointdata'));
      if(d['viewpoint'] = true){
        let data  = d['stepper'];

        this.appname= data['appname'];
        this.storage_Type= data['storage_type'];
        this.appvolume = data['node_count'];
        this.instance_type = data['instance_type'];
        this.applications = data['selected_apps'];
        this.additional_features = data['additional_features'];
        // this.app_storage['active'] = true;
        // this.app_storage['_disabled'] = false;
        // this.app_bundle['active'] = true;
        // this.app_bundle['_disabled'] = false;
        // this.app_features['active'] = true;
        // this.app_features['_disabled'] = false;
        // this.step['active'] = true;
        // this.step['_disabled'] = false;

      }
    }

  }
  ngAfterViewInit():void{
  // { console.log("after view init")
    if(sessionStorage.getItem('viewpointdata')){
      let d = JSON.parse(sessionStorage.getItem('viewpointdata'));
      if(d['viewpoint'] = true){
        let data  = d['stepper'];

        // this.appname= data['appname'];
        // this.storage_Type= data['storage_type'];
        // this.appvolume = data['node_count'];
        // this.instance_type = data['instance_type'];
        // this.applications = data['selected_apps'];
        // this.additional_features = data['additional_features'];
        this.app_storage['active'] = true;
        this.app_storage['_disabled'] = false;
        this.app_bundle['active'] = true;
        this.app_bundle['_disabled'] = false;
        this.app_features['active'] = true;
        this.app_features['_disabled'] = false;
        this.step['active'] = true;
        this.step['_disabled'] = false;

      }
    }
  }
  ngAfterViewChecked():void{
  // { console.log("after view cehcked")
  //   if(sessionStorage.getItem('viewpointdata')){
  //     let d = JSON.parse(sessionStorage.getItem('viewpointdata'));
  //     if(d['viewpoint'] = true){
  //       let data  = d['stepper'];
  //
  //       // this.appname= data['appname'];
  //       // this.storage_Type= data['storage_type'];
  //       // this.appvolume = data['node_count'];
  //       // this.instance_type = data['instance_type'];
  //       // this.applications = data['selected_apps'];
  //       // this.additional_features = data['additional_features'];
  //       this.app_storage['active'] = true;
  //       this.app_storage['_disabled'] = false;
  //       this.app_storage['state'] = StepState.None;
  //       this.app_bundle['active'] = true;
  //       this.app_bundle['state'] = StepState.None;
  //       this.app_bundle['_disabled'] = false;
  //       this.app_features['active'] = true;
  //       this.app_features['_disabled'] = false;
  //       this.step['active'] = true;
  //       this.step['_disabled'] = false;
  //
  //     }
  //   }
  }
}
