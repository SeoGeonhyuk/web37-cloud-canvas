import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudACGRule implements NCloudModel {
    name: string;
    protocol: string;
    ipBlock: string;
    portRange: string;
    description: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_access_control_group_rule';
        this.priority = ResourcePriority.ACG_RULE;
        this.name = json.name || 'acg-rule';
        this.protocol = json.protocol;
        this.ipBlock = json.ipBlock;
        this.portRange = json.portRange;
        this.description = json.description;
    }

    getProperties() {
        return {
            access_control_group_no: 'ACG_ID_PLACEHOLDER',
            inbound: {
                protocol: this.protocol,
                ip_block: this.ipBlock,
                port_range: this.portRange,
                description: this.description,
            },
        };
    }
}
