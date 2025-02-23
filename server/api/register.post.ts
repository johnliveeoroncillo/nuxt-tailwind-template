
import joi from "joi";
import { Validation } from "../utils/validator";

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
    
    const user = await prisma.users.findUnique({
        where: {
            Email: data.email,
        }
    });
    if (user) {
        HttpErrors.Duplicate('User already exists');
    }

    return await prisma.users.create({
        data: {
            Email: data.email,
            Surname: data.email,
            Name: data.email,
            Password: data.password,
        }
    })
})
