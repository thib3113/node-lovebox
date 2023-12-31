import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG_PATH = path.join(__dirname, 'package.json');

const pkg = JSON.parse(fs.readFileSync(PKG_PATH).toString());

const packageConfig = pkg['node-red-configs'];

function kebabToCamel(kebab) {
    return kebab.replace(/-([a-z])/g, (_, match) => match.toUpperCase());
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const TEMPLATE_BASE_PATH = path.join(__dirname, '.template');
const SRC_DIRECTORY_PATH = path.join(__dirname, 'src');

async function main() {
    const questions = [
        {
            type: 'input',
            name: 'nodeName',
            message: 'Node name (in kebab-case format):',
            validate: (value) => (value ? true : 'Please enter a node name.')
        },
        {
            type: 'input',
            name: 'category',
            message: 'Node category:',
            default: packageConfig['category']
        },
        {
            type: 'input',
            name: 'displayName',
            message: 'Display name:',
            default: (answers) => capitalize(answers.nodeName?.split('-').join(' '))
        }
    ];

    // Ask questions to the user
    const answers = await inquirer.prompt(questions);

    const { nodeName, category, displayName } = answers;

    const nodeNameWithPrefix = `${packageConfig['name']}-${nodeName}`;

    const camelCaseName = kebabToCamel(nodeNameWithPrefix);
    const PascalCaseName = capitalize(camelCaseName);

    //check node files
    const templateNodesFiles = [
        { file: 'name.ts.template', destination: 'nodes' },
        { file: 'name.html.template', destination: 'nodes' },
        { file: 'TNameNode.ts.template', destination: 'types' },
        { file: 'TNameNodeConfig.ts.template', destination: 'types' }
    ].map((f) => ({
        file: path.join(TEMPLATE_BASE_PATH, f.file),
        destination: path.join(SRC_DIRECTORY_PATH, f.destination)
    }));

    templateNodesFiles.forEach(({ file }) => {
        if (!fs.existsSync(file)) {
            throw new Error(`file ${file} is missing`);
        }
    });

    const files = templateNodesFiles.map(({ file, destination }) => {
        let content = fs.readFileSync(file).toString();
        content = content
            .replace(/@@CAMEL_NODE_NAME/g, camelCaseName)
            .replace(/@@KEBAB_NODE_NAME/g, nodeNameWithPrefix)
            .replace(/@@PASCAL_NODE_NAME/g, PascalCaseName)
            .replace(/@@DISPLAY_NODE_NAME/g, displayName)
            .replace(/@@NODE_CATEGORY/g, category);

        // get filename
        const filename = path
            .basename(file)
            .replace(/name/i, PascalCaseName)
            .replace(/\.template$/, '');

        const filePath = path.join(destination, filename);

        return {
            filename,
            filePath,
            content
        };
    });

    //check if filePath already exist, else write it
    files.map((file) => {
        if (fs.existsSync(file.filePath)) {
            throw new Error(`${file.filePath} already exist, maybe this node name is already used ?`);
        }

        fs.writeFileSync(file.filePath, file.content);
    });

    //update package.json
    pkg['node-red'] = {
        ...(pkg['node-red'] ?? {}),
        nodes: {
            ...(pkg['node-red'].nodes ?? {}),
            [nodeNameWithPrefix]: `lib/nodes/${PascalCaseName}.js`
        }
    };

    fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, ' ', 2));
}

// Run the main script
main().catch(console.error);
