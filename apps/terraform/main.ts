import { CloudCanvasNode } from './interface/CloudCanvasNode';
import { NCloudProvider } from './model/NCloudProvider';
import { TerraformConvertor } from './convertor/TerraformConvertor';
import { sampleNodes } from './sample/sampleData';
import { saveTerraformFiles } from './util/file';

async function generateTerraformCode(): Promise<string> {
    const provider = new NCloudProvider({
        accessKey: 'var.access_key',
        secretKey: 'var.secret_key',
        region: 'var.region',
        site: 'public',
    });

    const converter = new TerraformConvertor(provider);
    converter.addResourceFromJson({ nodes: sampleNodes });

    return converter.generate();
}

async function main() {
    try {
        const terraformCode = await generateTerraformCode();
        await saveTerraformFiles(terraformCode, { log: true });
    } catch (error) {
        if (error instanceof Error) {
            console.error(
                'Error generating Terraform configuration:',
                error.message,
            );
        } else {
            console.error('An unknown error occurred');
        }
        process.exit(1);
    }
}

main().catch(console.error);
