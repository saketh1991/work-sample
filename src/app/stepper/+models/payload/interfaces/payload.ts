import {ICommonSubnet} from './common-subnet';
import {IDeploymentBundle} from './deployment-bundle';
import {IPublicKey} from './public-key';

export interface IPayload {
    availability_zone: string;
    common_subnet: ICommonSubnet;
    deployment_bundle: Array<IDeploymentBundle>;
    public_keys: Array<IPublicKey>;
    plan_id: string;
    region: string;
    system_time_zone: string;
    vpc_id: string;
    environment_name: string;
    environment_description: string;
    credentials: string;
}
