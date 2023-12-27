import { categories } from "#/models/audio_category";
import * as yup from "yup";
// create a get request api when user is fetched successfully check status code of 200 or throw an error

const { isValidObjectId } = require("mongoose");

export const CreateUserSchema = yup.object().shape({
	name: yup
		.string()
		.trim()
		.required("Name is missing!")
		.min(3, "Name is too short!")
		.max(20, "Name is too long!"),
	email: yup.string().required("Email is missing!").email("Invalid email id!"),
	password: yup
		.string()
		.trim()
		.required("Password is missing!")
		.min(3, "Password is too short!"),
	//TODO: check later the password part.
	// .matches(
	// 	/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
	// 	"Password is too simple!"
	// ),
});

export const TokenAndIdValidation = yup.object({
	token: yup.string().trim().required("Invalid Token!"),
	userId: yup
		.string()
		.transform(function (value) {
			if (this.isType(value) && isValidObjectId(value)) {
				return value;
			} else return "";
		})
		.required("Invalid UserId!"),
});

export const UpdatePasswordSchema = yup.object({
	token: yup.string().trim().required("Invalid Token!"),
	userId: yup
		.string()
		.transform(function (value) {
			if (this.isType(value) && isValidObjectId(value)) {
				return value;
			} else return "";
		})
		.required("Invalid UserId!"),
	password: yup
		.string()
		.trim()
		.required("Password is missing!")
		.min(3, "Password is too short!"),
});

export const SignInValidationSchema = yup.object().shape({
	email: yup.string().required("Email is missing!").email("Invalid email id!"),
	password: yup.string().trim().required("Password is missing!"),
});

export const AudioValidationSchema = yup.object().shape({
	title: yup.string().required("Title is missing!"),
	about: yup.string().required("About is missing!"),
	category: yup
		.string()
		.oneOf(categories, "Invalid Category")
		.required("Category is missing!"),
});

// while creating playlist there can be request
// with new playlist name and audio that user wants to store inside that playlist
// or user just want to create an empty playlist

export const NewPlaylistValidationSchema = yup.object().shape({
	title: yup.string().required("Title is missing!"),
	resId: yup.string().transform(function (value) {
		return this.isType(value) && isValidObjectId(value) ? value : "";
	}),
	visibility: yup
		.string()
		.oneOf(["public", "private"], "Visibility must be public or private!")
		.required("Visibility is missing!"),
});

export const UpdateHistorySchema = yup.object().shape({
	audio: yup
		.string()
		.transform(function (value) {
			if (this.isType(value) && isValidObjectId(value)) {
				return value;
			} else return "";
		})
		.required("Invalid audio Id!"),
	progress: yup.number().required("History Progress is missing!"),
	date: yup
		.string()
		.transform(function (value) {
			const date = new Date(value);
			if (date instanceof Date) return value;
			return "";
		})
		.required("Invalid Date!"),
});
