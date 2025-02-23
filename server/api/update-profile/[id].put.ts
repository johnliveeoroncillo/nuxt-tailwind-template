
import joi from "joi";
import { Validation } from "@/server/utils/validator";

interface Request {
    email: string;
}

const Validate = (request: Request): Request => {
    const schema = joi
        .object({
            email: joi.string().required(),
        })
        .required();

    const validate = new Validation(schema);
    return validate.validate(request);
};

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    // const query = getQuery(event);
    const user = event.context.user;

    const body = await readBody(event)
    const data = Validate(body);

    return { user, data, id };
})
