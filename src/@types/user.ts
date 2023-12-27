import { Request } from "express";

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: any;
				name: string;
				email: string;
				verified: boolean;
				avatar?: string;
				followers: number;
				followings: number;
			};
			token: string;
		}
	}
}

export interface CreateUser extends Request {
	body: {
		name: string;
		password: string;
		email: string;
	};
}

export interface VerifyEmailRequest extends Request {
	body: {
		userId: string;
		token: string;
	};
}
