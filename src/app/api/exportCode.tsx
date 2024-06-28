import axios from "axios";
import * as c from "../utils/constants";
 
export const getTestData = async () => {

	const response = await axios
		.get(c.FLASK_API_URL_ONLY_ENDPOINT)
		.then((response) => {
			alert("Response:", response.data);
      // console.log("Response:", response.data);
			return response;
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});

	return await response.data;
};
 

