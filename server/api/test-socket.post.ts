
import joi from "joi";
import { Validation } from "@/server/utils/validator";

interface Request {
    message: string;
}

const Validate = (request: Request): Request => {
    const schema = joi
        .object({
            message: joi.string().required(),
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
   
    const socketId = getHeader(event, 'x-socket-id');
    useNitroApp().hooks.callHook('custom:send-message', socketId ?? '', data.message);
})
