import { ResourcePriority } from '../enum/ResourcePriority';
import { NCloudModel } from '../interface/NCloudModel';

export class NCloudSubnet implements NCloudModel {
    id: string;
    name: string;
    subnet: string;
    zone: string;
    subnetType: string;
    usageType: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_subnet';
        this.priority = ResourcePriority.SUBNET;
        this.name = json.name || 'subnet';
        this.subnet = json.subnet;
        this.zone = json.zone;
        this.subnetType = json.subnetType;
        this.usageType = json.usageType;
    }

    getProperties() {
        return {
            vpc_no: 'VPC_ID_PLACEHOLDER',
            subnet: this.subnet,
            zone: this.zone,
            network_acl_no: 'VPC_ACL_PLACEHOLDER',
            subnet_type: this.subnetType,
            name: this.name,
            usage_type: this.usageType,
        };
    }
}
