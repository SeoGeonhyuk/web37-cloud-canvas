import { CloudCanvasNode } from '../interface/CloudCanvasNode';
import { NCloudModel } from '../interface/NCloudModel';
import { NCloudVPC } from '../model/NCloudVPC';
import { NCloudNetworkACL } from '../model/NCloudNetworkACL';
import { NCloudSubnet } from '../model/NCloudSubnet';
import { NCloudACG } from '../model/NCloudACG';
import { NCloudACGRule } from '../model/NCloudACGRule';
import { NCloudLoginKey } from '../model/NCloudLoginKey';
import { NCloudNetworkInterface } from '../model/NCloudNetworkInterface';
import { NCloudServer } from '../model/NCloudServer';
import { NCloudPublicIP } from '../model/NCloudPublicIP';

export function parseToNCloudModel(resource: CloudCanvasNode): NCloudModel {
    const { type, name, properties } = resource;

    switch (type.toLowerCase()) {
        case 'vpc':
            return new NCloudVPC({
                name: name || 'vpc',
                ipv4CidrBlock: properties.cidrBlock,
            });

        case 'networkacl':
            return new NCloudNetworkACL({
                name: name || 'nacl',
            });

        case 'subnet':
            return new NCloudSubnet({
                name: name || 'subnet',
                subnet: properties.subnet,
                zone: properties.zone,
                subnetType: properties.subnetType,
                usageType: properties.usageType,
            });

        case 'acg':
        case 'accesscontrolgroup':
            return new NCloudACG({
                name: name || 'acg',
                description: properties.description,
            });

        case 'acgrule':
        case 'accesscontrolgrouprule':
            return new NCloudACGRule({
                protocol: properties.protocol,
                ipBlock: properties.ipBlock,
                portRange: properties.portRange,
                description: properties.description,
            });

        case 'loginkey':
            return new NCloudLoginKey({
                name: name || 'login-key',
            });

        case 'networkinterface':
            return new NCloudNetworkInterface({
                name: name || 'nic',
            });

        case 'server':
            return new NCloudServer({
                name: name || 'server',
                serverImageProductCode: properties.serverImageProductCode,
                serverProductCode: properties.serverProductCode,
            });

        case 'publicip':
            return new NCloudPublicIP({
                name: name || 'public-ip',
            });

        default:
            throw new Error(`Unsupported resource type: ${type}`);
    }
}
