import { Provider } from '../interface/Provider';

export class NCloudProvider implements Provider {
    accessKey: string;
    secretKey: string;
    region: string;
    site: string;
    name: string;
    serviceType: string;
    requiredVersion: string;
    source: string;

    constructor(json: any) {
        this.serviceType = 'provider';
        this.name = 'ncloud';
        this.accessKey = json.accessKey;
        this.secretKey = json.secretKey;
        this.region = json.region;
        this.site = json.site || 'public';
        this.requiredVersion = '>= 0.13';
        this.source = 'NaverCloudPlatform/ncloud';
    }

    getProperties() {
        return {
            terraform: {
                required_providers: {
                    ncloud: {
                        source: this.source,
                    },
                },
                required_version: this.requiredVersion,
            },
            provider: {
                access_key: 'var.access_key',
                secret_key: 'var.secret_key',
                region: 'var.region',
                site: this.site,
                support_vpc: true,
            },
        };
    }
}
