/* eslint-disable @typescript-eslint/no-empty-function */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import yargs from 'yargs';

class ApiTemplate {
    #name;
    #method;
    #template = `
import joi from "joi";
import { Validation } from "@/server/utils/validator";

interface Request {
}

const Validate = (request: Request): Request => {
    const schema = joi
        .object({
        })
        .required();

    const validate = new Validation(schema);
    return validate.validate(request);
};

export default defineEventHandler(async (event) => {
    // const id = getRouterParam(event, 'id');
    // const query = getQuery(event);

    const body = await readBody(event)
    const data = Validate(body);

})
`;

    constructor(name, method) {
        this.#name = name;
        this.#method = method?.toLowerCase();
    }

    generate() {
        const route = `./server/api/${this.#name}${this.#method ? `.${this.#method}` : ''}.ts`;
        if (existsSync(route)) throw new Error('API file already existed');

        // Ensure the directory exists
        const directory = path.dirname(route); // Get the directory part of the path
        if (!existsSync(directory)) {
            mkdirSync(directory, { recursive: true }); // Create the directory recursively
        }
        
        writeFileSync(
            route,
            this.#template,
        );
    }
}

const commands = yargs(process.argv.slice(2))
    .demandCommand(1, 'You must provide a command') // Ensure a command is provided
    .options({
        docs: {
            type: 'boolean',
            default: false,
            describe: '',
        },
    });

try {
    commands.command(
        'make:api <name> <method>',
        'Create a new api handler',
        () => {},
        (argv) => {
            const template = new ApiTemplate(argv.name, argv.method);
            template.generate();
            console.log('API Handler successfully created');
        },
    );

    commands.strictCommands();
    commands.argv;
} catch (e) {
    console.error('\x1b[33m%s\x1b[0m', e.message);
}