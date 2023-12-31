const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const url = require('url');

const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json').toString());

const dist = path.join(__dirname, tsConfig.compilerOptions.outDir);

if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
}

//create pkg file
fs.writeFileSync(
    path.join(__dirname, 'src', 'pkg.ts'),
    `export const pkg = { name: '${process.env.npm_package_name}', version: '${process.env.npm_package_version}' };\n`
);

let makeAllPackagesExternalPlugin = {
    name: 'make-all-packages-external',
    setup(build) {
        let filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/; // Must not start with "/" or "./" or "../"
        build.onResolve({ filter }, (args) => ({ path: args.path, external: true }));
    }
};

async function copyFiles(dirA, dirB) {
    // Lire le contenu du dossier source
    const files = await fs.promises.readdir(dirA);

    await Promise.all(
        files.map(async (file) => {
            const sourcePath = path.join(dirA, file);
            const destPath = path.join(dirB, file);

            const fileStat = await fs.promises.stat(sourcePath);

            if (fileStat.isDirectory()) {
                await fs.promises.mkdir(destPath, { recursive: true });

                await copyFiles(sourcePath, destPath);
            } else {
                if (!file.endsWith('.ts')) {
                    await fs.promises.copyFile(sourcePath, destPath);
                }
            }
        })
    );
}

const main = async () => {
    await esbuild.build({
        entryPoints: ['./src/**/*.ts'],
        bundle: false,
        sourcemap: true,
        minify: false,
        plugins: [makeAllPackagesExternalPlugin],
        outdir: dist,
        format: 'cjs',
        platform: 'node',
        target: ['node16']
    });

    await copyFiles(path.join(__dirname, 'src', 'nodes'), path.join(dist, 'nodes'));
};

main().catch(console.error);
