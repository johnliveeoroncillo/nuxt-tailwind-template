
import joi from "joi";
import { Validation } from "@/server/utils/validator";

interface Request {
    key: string;
    value: string;
}

const Validate = (request: Request): Request => {
    const schema = joi
        .object({
            key: joi.string().required(),
            value: joi.string().required(),
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

    // List all keys with
    const keys = await useStorage('redis').getKeys()

    // Set a key with
    await useStorage('redis').setItem(data.key, data.value)

    // Remove a key with
    await useStorage('redis').removeItem('foo')

    return ResponseHandler.Ok({ data });
})
