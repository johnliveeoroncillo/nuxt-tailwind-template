
import joi from "joi";
import { Validation } from "@/server/utils/validator";

interface Request {
    email: string;
    password: string;
}

const Validate = (request: Request): Request => {
    const schema = joi
        .object({
            email: joi.string().email().required(),
            password: joi.string().min(6).required(),
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

    const isExistingUser = await prisma.users.findFirst({
        where: {
            email: data.email
        }
    })

    if (isExistingUser) { // true | {id: 1} | 'test'
        return ResponseHandler.Duplicate('User already exist');
    }

    // // Insert
    // const newUser = await prisma.users.create({
    //     data: {
    //         name: 'Test',
    //         email: data.email,
    //         password: data.password,
    //     }
    // })

    // // Update
    // const updatedUser = await prisma.users.update({
    //     where: {
    //         id: newUser.id
    //     },
    //     data: {
    //         name: 'Updated Test',
    //     }
    // })

    // Delete
    // await prisma.users.delete({
    //     where: {
    //         id: newUser.id
    //     },
    // })

    // Get Many
    // const users = await prisma.users.findMany({
    //     where: {
    //         name: {
    //             contains: 'test',
    //             mode: 'insensitive',
    //         }
    //     },
    // });

    return ResponseHandler.Ok({
        message: 'Registration successsful'
    })
})
