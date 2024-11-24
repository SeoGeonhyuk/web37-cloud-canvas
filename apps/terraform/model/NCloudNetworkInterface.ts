import { NetworkInterface } from '../interface/NetworkInterface';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudNetworkInterface implements NetworkInterface, NCloudModel {
    id: string;
    name: string;
    subnetNo: string;
    accessControlGroups: string[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_network_interface';
        this.priority = ResourcePriority.NETWORK_INTERFACE;
        Object.assign(this, json);
    }

    getProperties() {
        return {
            subnet_no: 'SUBNET_ID_PLACEHOLDER',
            name: this.name,
            access_control_groups: ['ACG_ID_PLACEHOLDER'],
        };
    }
}
