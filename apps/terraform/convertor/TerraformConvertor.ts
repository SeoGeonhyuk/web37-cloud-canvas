import { ResourceManager } from '../type/ResourceManager';
import { CodeGenerator } from '../type/TerraformGenerator';
import { NCloudProvider } from '../model/NCloudProvider';
import { CloudCanvasNode } from '../interface/CloudCanvasNode';
import { parseToNCloudModel } from '../util/resourceParser';

export class TerraformConvertor {
    private readonly resourceManager: ResourceManager;
    private readonly codeGenerator: CodeGenerator;
    private readonly provider: NCloudProvider;

    constructor(provider: NCloudProvider) {
        this.provider = provider;
        this.resourceManager = new ResourceManager();
        this.codeGenerator = new CodeGenerator(this.resourceManager);
    }

    addResourceFromJson(jsonData: { nodes?: CloudCanvasNode[] }): void {
        jsonData.nodes?.forEach((node) => {
            try {
                const resource = parseToNCloudModel(node);
                this.resourceManager.addResource(resource);
            } catch (error) {
                console.warn(`Skipping unsupported node type: ${node.type}`);
            }
        });
    }

    generate(): string {
        return this.codeGenerator.generateCode(this.provider);
    }
}
