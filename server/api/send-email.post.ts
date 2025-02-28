
import joi from "joi";
import { Validation } from "@/server/utils/validator";
import { Email } from "../lib/email";

interface Request {
    message: string;
    to: string;
}

const Validate = (request: Request): Request => {
    const schema = joi
        .object({
            message: joi.string().required(),
            to: joi.string().email().required(),
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

    event.waitUntil(Email.sendTemplated('welcome', {
        to: data.to,
        subject: 'Test',
        data,
    }))

    return ResponseHandler.Ok(data);
})
