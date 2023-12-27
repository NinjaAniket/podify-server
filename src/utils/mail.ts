import { generateTemplate } from "#/mail/template";
import EmailVerificationToken from "#/models/emailVerificationToken";
import nodemailer from "nodemailer";
import path from "path";
import {
	MAILTRAP_PASSWORD,
	MAILTRAP_USER,
	SIGN_IN_URL,
	VERIFICATION_EMAIL,
} from "./variables";

const generateMailTransporter = async () => {
	const transport = nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: MAILTRAP_USER,
			pass: MAILTRAP_PASSWORD,
		},
	});
	return transport;
};

interface Profile {
	name: string;
	email: string;
	userId: string;
}
export const sendVerificationMail = async (token: string, profile: Profile) => {
	const transport = await generateMailTransporter();

	const { name, email, userId } = profile;

	await EmailVerificationToken.create({
		owner: userId,
		token,
	});
	const welcomeMsg = `Hi ${name}, Welcome Use the given OTP to verify the email`;
	transport.sendMail({
		to: email,
		from: VERIFICATION_EMAIL,
		subject: "Welcome from podify",
		html: generateTemplate({
			title: "Welcome",
			message: welcomeMsg,
			logo: "cid:logo",
			banner: "cid:welcome",
			link: "#",
			btnTitle: token,
		}),

		attachments: [
			{
				filename: "logo.png",
				path: path.join(__dirname, "../mail/logo.png"),
				cid: "logo",
			},
			{
				filename: "welcome.png",
				path: path.join(__dirname, "../mail/welcome.png"),
				cid: "welcome",
			},
		],
	});
};

interface Options {
	email: string;
	link: string;
}

export const sendForgotPasswordLink = async (options: Options) => {
	const transport = await generateMailTransporter();

	const { email, link } = options;

	const message = `Click the link to reset your password: ${link}`;
	transport.sendMail({
		to: email,
		from: VERIFICATION_EMAIL,
		subject: "Reset Password Link",
		html: generateTemplate({
			title: "Forgot Password?",
			message,
			logo: "cid:logo",
			banner: "cid:welcome",
			link,
			btnTitle: "Reset Password",
		}),

		attachments: [
			{
				filename: "logo.png",
				path: path.join(__dirname, "../mail/logo.png"),
				cid: "logo",
			},
			{
				filename: "welcome.png",
				path: path.join(__dirname, "../mail/welcome.png"),
				cid: "welcome",
			},
		],
	});
};

export const sendPassResetSuccessMail = async (name: string, email: string) => {
	const transport = await generateMailTransporter();

	const message = `Hi ${name}, You have successfully reset your password.`;
	transport.sendMail({
		to: email,
		from: VERIFICATION_EMAIL,
		subject: "Password Reset Successfully",
		html: generateTemplate({
			title: "Password Reset Successfully",
			message,
			logo: "cid:logo",
			banner: "cid:welcome",
			link: SIGN_IN_URL,
			btnTitle: "Log in",
		}),

		attachments: [
			{
				filename: "logo.png",
				path: path.join(__dirname, "../mail/logo.png"),
				cid: "logo",
			},
			{
				filename: "welcome.png",
				path: path.join(__dirname, "../mail/welcome.png"),
				cid: "welcome",
			},
		],
	});
};
