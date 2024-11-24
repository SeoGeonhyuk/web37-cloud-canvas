import { NCloudModel } from '../interface/NCloudModel';

export class ResourceManager {
    private resources: NCloudModel[];
    private readonly nameMap: Map<string, string>;

    constructor() {
        this.resources = [];
        this.nameMap = new Map();
    }

    addResource(resource: NCloudModel): void {
        this.resources.push(resource);
        this.nameMap.set(resource.serviceType, resource.name);
    }

    getResources(): NCloudModel[] {
        return [...this.resources].sort((a, b) => a.priority - b.priority);
    }

    getNameMap(): Map<string, string> {
        return this.nameMap;
    }
}
