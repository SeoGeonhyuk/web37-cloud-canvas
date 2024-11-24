import { ResourcePriority } from '../enum/ResourcePriority';
import { NCloudModel } from '../interface/NCloudModel';

export class NCloudPublicIP implements NCloudModel {
    name: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_public_ip';
        this.priority = ResourcePriority.PUBLIC_IP;
        this.name = json.name;
    }

    getProperties() {
        return {
            server_instance_no: 'SERVER_ID_PLACEHOLDER',
        };
    }
}
