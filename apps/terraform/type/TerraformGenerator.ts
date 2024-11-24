import { replaceReferences } from '../util/reference';
import {
    generateProviderBlock,
    generateResourceBlock,
    generateTerraformBlock,
} from '../util/generator';
import { ResourceManager } from './ResourceManager';
import { NCloudProvider } from '../model/NCloudProvider';

export class CodeGenerator {
    private resourceManager: ResourceManager;

    constructor(resourceManager: ResourceManager) {
        this.resourceManager = resourceManager;
    }

    generateCode(provider: NCloudProvider): string {
        const providerProperties = provider.getProperties();

        const blocks = [
            generateTerraformBlock(
                providerProperties.terraform.required_providers.ncloud.source,
                providerProperties.terraform.required_version,
            ),
            generateProviderBlock(provider.name, providerProperties.provider),
            ...this.generateResourceBlocks(),
        ];

        return blocks.join('\n');
    }

    private generateResourceBlocks(): string[] {
        return this.resourceManager.getResources().map((resource) => {
            const properties = replaceReferences(
                resource.getProperties(),
                this.resourceManager.getNameMap(),
            );

            return generateResourceBlock(
                resource.serviceType,
                resource.name,
                properties,
            );
        });
    }
}
