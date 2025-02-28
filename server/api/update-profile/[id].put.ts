
import joi from "joi";
import { Validation } from "@/server/utils/validator";
import { Token } from "~/server/lib/token";

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

    const user = Token.getUser(event);

    const body = await readBody(event)
    const data = Validate(body);

    const updatedData = await prisma.users.update({
        where: {
            id: user.id,
        },
        data: {
            email: data.email,
        }
    })

    return ResponseHandler.Ok({ data: updatedData, message: 'Successully updated' });
})
