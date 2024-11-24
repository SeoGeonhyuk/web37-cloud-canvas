import { ACG } from '../interface/ACG';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudACG implements ACG, NCloudModel {
    id: string;
    name: string;
    vpcNo: string;
    description: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_access_control_group';
        this.priority = ResourcePriority.ACG;
        Object.assign(this, json);
    }

    getProperties() {
        return {
            name: this.name,
            vpc_no: 'VPC_ID_PLACEHOLDER',
            description: this.description,
        };
    }
}
