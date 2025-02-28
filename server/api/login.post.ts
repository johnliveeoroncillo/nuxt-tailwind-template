import joi from "joi";
import { Validation } from "../utils/validator";
import { ResponseHandler } from "../utils/response.handler";
import { Token } from "../lib/token";

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
        },
    })
    if (!user) {
        ResponseHandler.NotFound('User not found');
    }

    if (user?.password !== data.password) {
        ResponseHandler.BadRequest('Invalid username or password');
    }

    const token = Token.generate(user);
    Token.setSession(event, token);
   
    return ResponseHandler.Ok({
        data: user,
    })
})
