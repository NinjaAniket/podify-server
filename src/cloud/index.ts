import { CLOUD_API, CLOUD_NAME, CLOUD_SECRET } from "#/utils/variables";
import { v2 as cloundinary } from "cloudinary";

cloundinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_API,
	api_secret: CLOUD_SECRET,
	secure: true,
});

export default cloundinary;
