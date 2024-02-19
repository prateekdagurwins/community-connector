export const responseMessages = {
    USER_ADDED: "User is Added Successfully",
    USER_UPDATE: "User is updated Successfully",
    USER_DELETED: "User is deleted Successfully",
    USER_FETCHED: "Users are fetched Successfully",
    USER_LOGIN: "User is logged in",
    USER_LOGOUT: "User is logged out",
    SOMETHING_WENT_WRONG: "Something went wrong",
    WRONG_CRED: "You have entered wrong credentials",
    CRED_REQUIRED: "Email and Password are required",
    NO_USER: "NO user is found",
    WRONG_PASS: "Enter the correct password",
    INVALID_USER: "Invalid Authentication",
    ACCEPT_PARAMETER: "Only Array of values or single value string is accepted for compression",
    RECORD_ALREADY_EXIST: "This record already exists",
    INVALID_USER_TYPE: "Invalid user type",
    USER_NOT_LOGIN: "User was not log in"
}

export const notificationPayload = {}

export const statusCodes = {
    'SUCCESS': 200,
    'RECORD_CREATED': 201,
    'BAD_REQUEST': 400,
    'AUTH_ERROR': 401,
    'FORBIDDEN': 403,
    'NOT_FOUND': 404,
    'INVALID_REQUEST': 405,
    'RECORD_ALREADY_EXISTS': 409,
    'SERVER_ERROR': 500
}

const makeResponse = async (res, statusCode, success, message, payload = null, meta = {}) =>
    new Promise(resolve => {
        res.status(statusCode)
            .send({
                success,
                code: statusCode,
                message,
                data: payload,
                meta
            });
        resolve(statusCode);
    });

export { makeResponse };
   