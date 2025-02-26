
import joi from "joi";
import { Validation } from "../utils/validator";
import { ResponseHandler } from "../utils/response.handler";

interface Request {
    email: string;
    password: string;
}

const Validate = (request: Request): Request => {
    const schema = joi
        .object({
            email: joi.string().required(),
            password: joi.string().required(),
        })
        .required();

    const validate = new Validation(schema);
    return validate.validate(request);
};

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const data = Validate(body);
    
    const user = await prisma.users.findFirst({
        where: {
            email: data.email,
        }
    });
    if (user) {
        ResponseHandler.Duplicate('User already exists');
    }

    return await prisma.users.create({
        data: {
            email: data.email,
            name: data.email,
            password: data.password,
        }
    })
})
