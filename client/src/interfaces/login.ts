export interface UserInterface {
	message: string;
	err: {};
	user: {
		id: string;
		email: string;
		phone: string;
		interest: string;
		name: string;
		avatar: string;
		isVerified: boolean;
	};
	token: string;
	success: boolean;
}

export interface payloadErrorResponse {
	name?: string;
	message?: string;
	stack?: string;
	code?: string;
}
