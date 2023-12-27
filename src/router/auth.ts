import {
	create,
	generateForgotPasswordLink,
	grantValid,
	logOut,
	sendProfile,
	sendReVerificationToken,
	signIn,
	updatePassword,
	updateProfile,
	verifyEmail,
} from "#/controller/auth";
import { isValidPassResetToken, mustAuth } from "#/middleware/auth";
import { validate } from "#/middleware/validator";
import {
	CreateUserSchema,
	SignInValidationSchema,
	TokenAndIdValidation,
	UpdatePasswordSchema,
} from "#/utils/validationSchema";
import { Router } from "express";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import fileParser, { RequestWithFiles } from "#/middleware/fileParser";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(TokenAndIdValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forgot-password", generateForgotPasswordLink);
router.post(
	"/verify-pass-reset-token",
	validate(TokenAndIdValidation),
	isValidPassResetToken,
	grantValid
);
router.post(
	"/update-password",
	validate(UpdatePasswordSchema),
	isValidPassResetToken,
	updatePassword
);

router.post("/sign-in", validate(SignInValidationSchema), signIn);
router.get("/is-auth", mustAuth, sendProfile);

router.post("/update-profile", mustAuth, fileParser, updateProfile);
router.post("/logout", mustAuth, logOut);
export default router;
