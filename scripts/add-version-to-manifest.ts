import { loadJsonFile } from 'load-json-file';
import { writeJsonFile } from 'write-json-file';
import { z } from "zod";

const manifestPath = 'dist/manifest.json';

(async () => {
    try {
        const packageJson = await loadJsonFile('package.json');
        const manifestJson = await loadJsonFile(manifestPath);

        const { version } = z.object({
            version: z.string(),
        }).parse(packageJson);

        if (!manifestJson) throw new Error(`${manifestPath} Could not be loaded, result is null!`);
        manifestJson['version'] = version;

        console.log(`Added version ${version} to ${manifestPath}`);
        await writeJsonFile(manifestPath, manifestJson);
    } catch (error) {
        console.error(error);
    }
})();
