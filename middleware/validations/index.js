import Joi from "joi";
import { makeResponse, statusCodes} from "../../utilities/index.js";
import {validateSchema} from "../schema/index.js";
//Response Status code
const {BAD_REQUEST} = statusCodes;

// Input Validations
export const validators = (payload) =>
    async (req, res, next) => {

        const schema = validateSchema(payload)
        const { error } = schema.validate(req.body, { allowUnknown: true });
        if (error) return makeResponse(res, BAD_REQUEST, false, error.message);
        next();
    };
    