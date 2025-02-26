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
    // SAMPLE SENDING TO SOCKET ID
    const socketId = getHeader(event, 'x-socket-id');
    useNitroApp().hooks.callHook('custom:send-message', socketId, 'login post');

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

    setCookie(event, 'token', 'test', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    })

    return user;
})
