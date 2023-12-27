import { Request } from "express";

declare module "express" {
	export interface Request {
		user?: {
			id: string;
			name: string;
			email: string;
			verified: boolean;
			avatar?: string;
			followers: number;
			followings: number;
		};
	}
}
