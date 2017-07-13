//noinspection ES6UnusedImports
import {Injectable,Inject} from '@angular/core';
import {Apiurl} from '../app/api-url';
import { Http, Response, Headers } from '@angular/http';
import {TokenService} from "../modules/nebula-api";
@Injectable()
export class planService {
  body: any;
  result: any;
  public res;
  id: any;
  type: any;
  size: any;
  region: any;
  timezone: any;
  id_res: string;
  api:any;
  product_id:any;
  instances:any[];
  constructor(private http: Http, private apiurl:Apiurl, private TokenService:TokenService) {
    this.api=apiurl.api();
    //this.result=" ";//need to bind here
    // this.http=http;
  }
  /* json data structure to post the data to the plan*/
  query(req): any {
    // this.product_list().subscribe(data=> {
    //   this.instances= data;


    sessionStorage.setItem('apps', JSON.stringify(req.apps));
    sessionStorage.setItem('additional_features', JSON.stringify(req.additional_features));
    if(req.storage_type === 'EBS_SSD') {
      this.body = {
        "plan": {
          "properties": {
            "plan_description": req.plan_desc,
            "plan_name": req.plan_name,
            "provider": "aws",
            "tdplan_type": req.plan_type
          },
          "common_subnet": {
            "subnet_name": "public-subnet"
          },
          "deployment_bundle": [
            {
              "configuration": {
                "td_product_id": JSON.parse(sessionStorage.getItem('bundle'))['code'],
                "system_name": "a teradata database application",
                "system_type": "tddbs"
              },
              "instances": {
                "count": req.volume_count,
                "type": req.instance_type
              },
              "instance_volumes": {
                "size_in_terabytes": req.ebs_storage_type,
                "encryption": "True",
                "type": "ebs_gp2"
              }
            }

          ]
        }
      }
    }
    else{
      this.body = {
        "plan": {
          "properties": {
            "plan_description": req.plan_desc,
            "plan_name": req.plan_name,
            "provider": "aws",
            "tdplan_type": req.plan_type
          },
          "common_subnet": {
            "subnet_name": "public-subnet"
          },
          "deployment_bundle": [
            {
              "configuration": {
                "td_product_id": JSON.parse(sessionStorage.getItem('bundle'))['code'],
                "system_name": "a teradata database application",
                "system_type": "tddbs"
              },
              "instances": {
                "count": req.volume_count,
                "type": req.instance_type
              }
            }

          ]
        }
      }
    }

    for (let i = 0 ; i < req.additional_features.length;i++) {
      // for (let e in this.instances) {
        if (req.additional_features[i].checked == true) {
          if (req.additional_features[i].name == 'Data Mover') {
            let obj = {
              "configuration": {
                "td_product_id": 'td_dm_1st_edition',
                "system_type": "datamover",
                "system_name": "a datamover application"
              },
              "instances": {
                "count": 1,
                "type": "m4.xlarge"
              }
            };
            this.body.plan.deployment_bundle.push(obj);
          }
        }
      // }
    }
    for(let i = 0; i< req.apps.length ;i++){
      if(req.apps[i].checked == true){
        if(req.apps[i].name == "Ecosystem Manager"){
          let obj = {
            "configuration": {
              "td_product_id": "td_em_1st_edition",
              "system_type": "ecosystemmanager",
              "system_name": "a ecosystem manager application"
            },
            "instances": {
              "count": 1,
              "type": "m4.2xlarge"
            }
          };
          this.body.plan.deployment_bundle.push(obj);
        }
        if(req.apps[i].name == "Data Stream Controller"){
          let obj = {
            "configuration": {
              "td_product_id": "td_dsu_1st_edition",
              "system_type": "dsu",
              "system_name": "a dsu application"
            },
            "instances": {
              "count": 1,
              "type": "m4.2xlarge"
            }
          };
          this.body.plan.deployment_bundle.push(obj);
        }
        if(req.apps[i].name == "Viewpoint Single System"){
          let obj = {
            "configuration": {
              "td_product_id": "td_vp_1st_edition",
              "system_type": "viewpoint",
              "system_name": "a view point application"
            },
            "instances": {
              "count": 1,
              "type": "m4.2xlarge"
            }
          };
          this.body.plan.deployment_bundle.push(obj);
        }
        if(req.apps[i].name == "Rest Services"){
          let obj = {
            "configuration": {
              "td_product_id": "td_rest_1st_edition",
              "system_type": "rest",
              "system_name": "a rest application"
            },
            "instances": {
              "count": 1,
              "type": "t2.large"
            }
          };
          this.body.plan.deployment_bundle.push(obj);
        }
            if(req.apps[i].name == "Server Management") {
              let obj = {
                "configuration": {
                  "td_product_id": "td_sm_1st_edition",
                  "system_type": "servermanagement",
                  "system_name": "a servermanagement application"
                },
                "instances": {
                  "count": 1,
                  "type": "m4.xlarge"
            }
          };
          this.body.plan.deployment_bundle.push(obj);
        }
      }
    }


    /* post request to the plan*/
    return this.http.post(this.api+'plans',
      JSON.stringify(this.body),{
        headers: new Headers({
          'Authorization':"JWT "+this.TokenService.getToken(),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Methods': 'POST',
          //'Access-Control-Max-Age':3000,
          //'Access-Control-Allow-Credentials':'true'
        })
      }
    )
      .map((res: Response) => { return res.json() });
    //.subscribe(data=> this.result=data.plan_id);

  }
// );}
  /* post request for the environment*/

node_limit(type):any{
  let token=this.TokenService.getToken();
  return this.http.get(this.api+'providers/aws/products/'+type+'/product_specifics',{
    headers: new Headers({

      'Authorization':"JWT "+token,
      'Access-Control-Allow-Origin': '*',
      //'Access-Control-Allow-Methods': 'POST',
      //'Access-Control-Max-Age':3000,
      //'Access-Control-Allow-Credentials':'true'
    })

  })
    .map((res: Response) => {

      return res.json();
    });
}



  environment(req): any {

    this.id = {
      "availability_zone":req.availability_zone,
      "common_subnet": {
        "subnet_name": req.public_subnet,
        "cidr": req.cidr
      },
      "deployment_bundle": [
        {
          "configuration": {
            "db_kanji_support": req.kanji_support,
            "db_nickname": req.db_nickname,
            "db_system_name":req.db_systemname,
            "dbc_password":req.db_password,
          },
          "properties": {

            "system_type": "tddbs"
          }
        },
        {
          "properties": {

            "system_type": "viewpoint"
          }
        },
        {
          "properties": {

            "system_type": "dsu"
          }
        },

        {
          "properties": {

            "system_type": "ecosystemmanager"
          }
        },
        {
          "configuration": {
            "sm_site_id": req.sm_site_id,
            "sm_rest_password": req.sm_rest_pass,
            "sm_password": req.sm_pass,
          },
          "properties": {
            "system_type": "servermanagement"
          }
        }
      ],
      "public_keys":[
        {
          "key_name": "chris_key"
        }
      ],
      "plan_id":req.planid,
      "region": req.region,
      "system_time_zone":req.timezone,
      "vpc_id": req.vpc_id,
      "credentials":"dangawscred",
    };


    if(req.dm == true){

      let obj = {  "configuration": {
        "dm_datamover_password": req.dm_id,
        "dm_dbc_password":  req.dm_pass
      },
        "properties": {

          "system_type": "datamover"
        }
      };

      this.id.deployment_bundle.push(obj);
    }

    let token = this.TokenService.getToken();
    return this.http.post(this.api+'environments',
      JSON.stringify(this.id),{
        headers: new Headers({
          'Authorization':"JWT "+token,
          //'Content-Type': 'application/json'
          'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Methods': 'POST',
          //'Access-Control-Max-Age':3000,
          //'Access-Control-Allow-Credentials':'true'
        })
      }
    )

      .map((res: Response) => { return res.json() })


  }
  /* get request to get the tdplans*/
  //noinspection JSMethodCanBeStatic
  createAuthorizationHeader(headers:Headers) {

    headers.append('Authorization', 'JWT ' + this.TokenService.getToken()
    );
  }
  tdplan(): any {

    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.api+'providers/aws/bundles',{headers:headers})
      .map((res: Response) => {
        return res.json();
      });

  }
  bundle_detail():any{
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.get(this.api+'providers/aws/products/'+JSON.parse(sessionStorage.getItem('bundle'))['code']+'/sizing',{headers:headers})
      .map((res:Response)=>{
        return res.json();
      });
  }
  bundle_storagetype():any{
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.api+'providers/aws/products/'+this.product_id+'/sizing',{headers:headers})
      .map((res:Response)=>{
        return res.json();
      });
  }
 product_list():any{
  let headers = new Headers();
  this.createAuthorizationHeader(headers);
  return this.http.get(this.api+'providers/aws/products',{headers:headers})
    .map((res:Response)=>{
      return res.json();
    });

 }

  instance_details():any{
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.api+'providers/aws/instances',{headers:headers})
      .map((res:Response)=>{
        return res.json();
      });
  }
  product_details():any{
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.api+'providers/aws/products/'+this.product_id,{headers:headers})
      .map((res:Response)=>{
        return res.json();
      });
  }
  node_details():any{

    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.api+'providers/aws/products/'+this.product_id+'/product_specifics',{headers:headers})
      .map((res:Response)=>{
        return res.json();
      });

  }

}
