import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instance-calculator',
  templateUrl: './instance-calculator.component.html',
  styleUrls: ['./instance-calculator.component.scss']
})
export class InstanceCalculatorComponent implements OnInit {

  constructor() { }
  appplan:any;
  appvolume:any;
  selected_instance:any;
  total_storage:any;
  total_vcore:any;
  total_memory:any;
  applications:any=[];
  additional_features:any=[];
  appname:any;
  storage_Type:any;
  appstorage:any;
  throughput:any;
  network_performance:any;

  ngOnInit() {
    this.appplan = JSON.parse(sessionStorage.getItem('bundle'))['name'];
    this.applications = JSON.parse(sessionStorage.getItem('apps'))
    this.additional_features = JSON.parse(sessionStorage.getItem('additional_features'))
    let d =JSON.parse(sessionStorage.getItem('instance_calculator'));
    this.appvolume= d['appvolume'];
    this.selected_instance=d['selected_instance'];
    this.total_storage=d['total_storage']
    this.total_vcore=d['total_vcore'];
    this.total_memory = d['total_memory'];
    this.appname= d['appname'];
    this.appstorage= d['appstorage'];
    this.storage_Type = d['storage_Type'];
    this.throughput= d['throughput'];
    this.network_performance = d['network_performance']

  }


}
