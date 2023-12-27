import { compare, hash } from "bcrypt";
import { Model, ObjectId, Schema, model } from "mongoose";

interface PasswordVerificationTokenDocument {
	owner: ObjectId;
	token: string;
	createdAt: Date;
}

interface Methods {
	compareToken(token: string): Promise<boolean>;
}

const passwordResetTokenSchema = new Schema<
	PasswordVerificationTokenDocument,
	{},
	Methods
>({
	owner: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		expires: 3600, //60 min * 60 sec = 3600sec,
		default: Date.now(),
	},
});

//hash token
passwordResetTokenSchema.pre("save", async function (next) {
	if (this.isModified("token")) this.token = await hash(this.token, 10);
	next();
});

//compare hashed token and un hash it.

passwordResetTokenSchema.methods.compareToken = async function (token) {
	const result = await compare(token, this.token);
	return result;
};

export default model("PasswordResetToken", passwordResetTokenSchema) as Model<
	PasswordVerificationTokenDocument,
	{},
	Methods
>;
