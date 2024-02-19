import jwt from "jsonwebtoken"
import { makeResponse, statusCodes, responseMessages} from "../../utilities/index.js";
import { redisClient } from "../../loader/index.js";

//Response Status code
const {AUTH_ERROR} = statusCodes;

//Response Messages
const {INVALID_USER} = responseMessages;
const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization");
		if (!token) {
            return makeResponse(res, AUTH_ERROR, false, INVALID_USER);
		}
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
			if (err) {
                console.error(err.message);
                return makeResponse(res, AUTH_ERROR, false, INVALID_USER);
			}
			const redisCongET = await redisClient.get(`user:${user.id}`);
			if(redisCongET === null || redisCongET !== token){
                return makeResponse(res, AUTH_ERROR, false, INVALID_USER);
			}
			req.user = user;
			next();
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

export default auth;