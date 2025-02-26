
export class ResponseHandler {
    static Ok(data?: any, message?: string) {
        return {
            status: 200,
            message: message ?? 'Ok',
            data,
        };
    }

    static Forbidden(message?: string) {
        throw createError({
            status: 403,
            message: message ?? 'Forbidden',
        })
    }

    static Unauthorized(message?: string) {
        throw createError({
            status: 401,
            message: message ?? 'Unauthorized',
        })
    }

    static BadRequest(message?: string) {
        throw createError({
            status: 400,
            message: message ?? 'Bad Request',
        })
    }

    static ParameterError(errors?: any) {
        const parsedErrors: any = {};

        if (errors.details?.length) {
            errors.details?.forEach((element: any) => {
                const path = element.path[element.path.length - 1];
                const message = element.message;
                parsedErrors[path] = message;
            });
        }

        throw createError({
            status: 422,
            message: 'Parameter Error',
            data: parsedErrors,
            fatal: true,
        })
    }

    static NotFound(message?: string) {
        throw createError({
            status: 404,
            message: message ?? 'Not Found',
        })
    }

    static Duplicate(message?: string) {
        throw createError({
            status: 409,
            message: message ?? 'Duplicate',
        })
    }
}