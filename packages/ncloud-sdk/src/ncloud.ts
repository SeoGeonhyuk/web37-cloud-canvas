import * as fs from 'fs';
import * as path from 'path';

export interface ApiKey {
    accessKey?: string;
    secretKey?: string;
}

export class ncloud {
    private readonly apiKey: ApiKey;
    constructor(arg?: ApiKey) {
        if (arg) {
            const { accessKey, secretKey } = arg;
            this.apiKey = {};
            if (accessKey && secretKey) this.apiKey = arg;
        } else this.apiKey = {};
    }

    private getConfigureFilePath() {
        return path.join(process.cwd(), 'ncloud.config');
    }

    private readConfigureFile() {
        const configFilePath = this.getConfigureFilePath();
        if (!fs.existsSync(configFilePath)) {
            return {};
        }
        const configFileData = JSON.parse(
            fs.readFileSync(configFilePath, 'utf-8')
        );
        return configFileData;
    }

    keys() {
        if (this.apiKey.accessKey && this.apiKey.secretKey) {
            return this.apiKey;
        }
        if (
            process.env['NCLOUD_ACCESS_KEY'] &&
            process.env['NCLOUD_SECRET_KEY']
        ) {
            return {
                accessKey: process.env['NCLOUD_ACCESS_KEY'],
                secretKey: process.env['NCLOUD_SECRET_KEY'],
            };
        }
        const config = this.readConfigureFile();
        return {
            accessKey: config.accessKey,
            secretKey: config.secretKey,
        };
    }
}
