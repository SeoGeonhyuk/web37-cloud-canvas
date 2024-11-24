import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudLoginKey implements NCloudModel {
    name: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_login_key';
        this.priority = ResourcePriority.LOGIN_KEY;
        this.name = json.name;
    }

    getProperties() {
        return {
            key_name: this.name,
        };
    }
}
