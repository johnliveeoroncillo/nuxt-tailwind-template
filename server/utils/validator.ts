import { Schema } from 'joi';
import { ResponseHandler } from './response.handler';

export class Validation {
    private schema: Schema;

    constructor(schema: Schema) {
        this.schema = schema;
    }

    validate(request: any) {
        const { value, error } = this.schema.validate(request, {
            abortEarly: false,
            errors: {
                wrap: {
                    label: '',
                },
            },
        });
        if (error) {
            ResponseHandler.ParameterError(error);
        }

        return value;
    }
}