import axios from "axios";
import * as c from "../utils/constants";

// GET AUTH PARAMS
const axiosConfig = {
	headers: c.AUTH_CUSTOM_HEADERS,
};

export const getToken = async (email: string, password: string) => {
	// const formData = new URLSearchParams();
	// formData.append('grant_type', c.AUTH_GRANT_TYPE);
	// formData.append('username', email);
	// formData.append('password', password);

	// // CHQ: I found where the environmental variables are called. Success.
	// const response = await axios
	// 	.post(c.GET_TOKEN_ENDPOINT
	// 		, formData.toString(), axiosConfig)
	// 	.then((response) => {
	// 		console.log("Response:", response.data);
	// 		return response;
	// 	})
	// 	.catch((error) => {
	// 		console.error("Error:", error);
	// 		return error;
	// 	});

	return response.data;
};



