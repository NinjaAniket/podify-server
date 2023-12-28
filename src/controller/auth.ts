import { CreateUser, VerifyEmailRequest } from "#/@types/user";
import EmailVerificationToken from "#/models/emailVerificationToken";
import PasswordResetToken from "#/models/passwordResetToken";
import User from "#/models/user";
import { formatProfile, generateToken } from "#/utils/helper";
import {
	sendForgotPasswordLink,
	sendPassResetSuccessMail,
	sendVerificationMail,
} from "#/utils/mail";
import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import crypto from "crypto";
import { JWT_SECRET, PASSWORD_RESET_LINK } from "#/utils/variables";
import jwt from "jsonwebtoken";
import { RequestWithFiles } from "#/middleware/fileParser";
import cloundinary from "#/cloud";
import formidable from "formidable";

export const create: RequestHandler = async (req: CreateUser, res) => {
	const { email, password, name } = req.body;

	const oldUser = await User.findOne({ email });

	if (oldUser)
		return res.status(403).json({ error: "Email is already in use!" });

	const user = await User.create({ name, email, password });

	//send verification mail

	const token = generateToken();
	// await EmailVerificationToken.create({
	// 	owner: user._id,
	// 	token,
	// });
	sendVerificationMail(token, { name, email, userId: user._id.toString() });

	res.status(201).json({ user: { id: user._id, name, email } });
};

export const verifyEmail: RequestHandler = async (
	req: VerifyEmailRequest,
	res
) => {
	const { token, userId } = req.body;

	const verificationToken = await EmailVerificationToken.findOne({
		owner: userId,
	});

	if (!verificationToken)
		return res.status(403).json({
			error: "Invalid Token",
		});

	const matched = await verificationToken?.compareToken(token);
	if (!matched)
		return res.status(403).json({
			error: "Invalid Token",
		});

	await User.findByIdAndUpdate(userId, {
		verified: true,
	});

	await EmailVerificationToken.findByIdAndDelete(verificationToken._id);
	res.json({ message: "Your Email is verified" });
};

export const sendReVerificationToken: RequestHandler = async (req, res) => {
	const { userId } = req.body;

	if (!isValidObjectId(userId))
		return res.status(403).json({
			error: "Invalid User Id",
		});
	const user = await User.findById(userId);
	if (!user)
		return res.status(403).json({
			error: "Invalid User",
		});

	if (user.verified)
		return res.status(422).json({
			error: "Account Already Verified",
		});

	await EmailVerificationToken.findOneAndDelete({
		owner: userId,
	});
	const token = generateToken();
	await EmailVerificationToken.create({
		owner: userId,
		token,
	});

	sendVerificationMail(token, {
		name: user?.name,
		email: user?.email,
		userId: user?._id.toString(),
	});
	res.json({ message: "Please Check your mail." });
};

export const generateForgotPasswordLink: RequestHandler = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user)
		return res.status(404).json({
			error: "Account not found",
		});

	await PasswordResetToken.findOneAndDelete({
		owner: user._id,
	});

	const token = crypto.randomBytes(36).toString("hex");
	PasswordResetToken.create({
		//crypto generate random data
		owner: user._id,
		token,
	});

	const resetLink = `${PASSWORD_RESET_LINK}?token=${token}&userId=${user._id}`;
	sendForgotPasswordLink({ email: user.email, link: resetLink });
	res.json({ message: "Please Check Your Mail Password Reset Link has sent" });
};

export const grantValid: RequestHandler = async (req, res) => {
	res.json({
		valid: true,
	});
};
export const updatePassword: RequestHandler = async (req, res) => {
	const { password, userId } = req.body;
	const user = await User.findById(userId);
	if (!user) return res.status(403).json({ error: "Invalid User" });
	const matched = await user.comparePassword(password);
	if (matched)
		return res.status(422).json({ error: "New Password must be different" });

	user.password = password;
	await user.save();
	PasswordResetToken.findOneAndDelete({
		owner: user._id,
	});
	//SEND SUCCESS MAIL

	sendPassResetSuccessMail(user.name, user.email);
	res.json({ message: "Password Reset Successfully!" });
};

export const signIn: RequestHandler = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({
		email,
	});

	if (!user)
		return res.status(403).json({
			error: "Invalid email or password",
		});

	//compare password
	const matched = await user.comparePassword(password);

	if (!matched)
		return res.status(403).json({
			error: "Invalid email or password",
		});

	//generate token for later use

	const token = jwt.sign(
		{
			userId: user._id,
		},
		JWT_SECRET
	);
	user.tokens.push(token);

	await user.save();

	res.json({
		profile: {
			id: user._id,
			name: user.name,
			email: user.email,
			verified: user.verified,
			avatar: user.avatar?.url,
			followers: user.followers.length,
			followings: user.followings.length,
		},
		token,
	});
};

export const updateProfile: RequestHandler = async (
	req: RequestWithFiles,
	res
) => {
	const { name } = req.body;
	const avatar = req.files?.avatar as formidable.File;
	console.log(req.files, "req now");

	const user = await User.findById(req!.user!.id);
	if (!user) throw new Error("User not found");

	if (typeof name !== "string")
		return res.status(422).json({ error: "Invalid name!" });

	if (name.trim().length < 3)
		return res.status(422).json({ error: "Invalid name!" });
	user.name = name;

	if (avatar) {
		//if avatar already exist remove avatar from cloudinary
		if (user.avatar?.publicId) {
			await cloundinary.uploader.destroy(user.avatar?.publicId);
		}

		//upload new avatar
		const { secure_url, public_id } = await cloundinary.uploader.upload(
			avatar.filepath,
			{
				width: 300,
				height: 300,
				crop: "thumb",
				gravity: "face",
			}
		);
		user.avatar = { url: secure_url, publicId: public_id };
	}

	await user.save();
	res.json({
		profile: formatProfile(user),
	});
};

export const sendProfile: RequestHandler = (req, res) => {
	res.json({
		profile: req.user,
	});
};

export const logOut: RequestHandler = async (req, res) => {
	// "/auth/logout?fromAll=true";
	const { fromAll } = req.query;
	const token = req.token;
	const user = await User.findById(req!.user!.id);
	if (!user) throw new Error("User not found");

	if (fromAll === "yes") {
		user.tokens = [];
	} else user.tokens = user.tokens.filter((t) => t !== token);
	await user.save();
	res.json({ success: true });
};
