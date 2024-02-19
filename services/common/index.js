import jwt from "jsonwebtoken"
//Function to to create access token.
export const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};